
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import instance from "../../axios/instance";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/Slices/taskSlice";

function AddTask({ onTaskAdded }) {
const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({
    taskTitle: "",
    taskDesc: "",
    taskStatus: "pending",
  });

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

      const { data } = await instance.post(
        "/tasks/create",
        {
          ...taskData,
          taskTitle: taskData.taskTitle.trim(),
          taskDesc: taskData.taskDesc.trim(),
        }
      );
        dispatch(addTask(data));

      toast.success(data?.message || "Task added successfully!");

      onTaskAdded(data.task);

      setTaskData({
        taskTitle: "",
        taskDesc: "",
        taskStatus: "pending",
      });

    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="task-form-card">
      <Card.Body>
        <div className="task-section-heading">
          <div>
            <span className="section-subtitle">GET STARTED</span>
            <h4>Create a new task</h4>
            <p>What's on your mind today?</p>
          </div>

          <div className="task-heading-icon">＋</div>
        </div>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>

            <Form.Control
              type="text"
              name="taskTitle"
              placeholder="Enter task title"
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
              rows={3}
              name="taskDesc"
              placeholder="Describe your task..."
              value={taskData.taskDesc}
              onChange={handleChange}
              maxLength={1000}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Task Status</Form.Label>

            <Form.Select
              name="taskStatus"
              value={taskData.taskStatus}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Button
            type="submit"
            className="task-primary-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "+ Add Task"}
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddTask;
