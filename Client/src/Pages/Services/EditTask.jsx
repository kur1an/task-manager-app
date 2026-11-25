
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import instance from "../../axios/instance";
import { useDispatch } from "react-redux";
import { editTask } from "../../store/Slices/taskSlice";

function EditTask({ show, handleClose, task, onTaskUpdated }) {
const dispatch = useDispatch();

  const [taskData, setTaskData] = useState(() => ({
    taskTitle: task?.taskTitle || "",
    taskDesc: task?.taskDesc || "",
    taskStatus: task?.taskStatus || "pending",
  }));

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskData.taskTitle.trim() || !taskData.taskDesc.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await instance.put(
        `/tasks/${task._id}`,
        {
          ...taskData,
          taskTitle: taskData.taskTitle.trim(),
          taskDesc: taskData.taskDesc.trim(),
        }
      );
        dispatch(editTask(data));

      toast.success(data?.message || "Task updated successfully!");

      onTaskUpdated(data.task);
      handleClose();

    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="task-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>

            <Form.Control
              type="text"
              name="taskTitle"
              value={taskData.taskTitle}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              name="taskDesc"
              value={taskData.taskDesc}
              onChange={handleChange}
              maxLength={1000}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>

            <Form.Select
              name="taskStatus"
              value={taskData.taskStatus}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="task-primary-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditTask;
