import { useState } from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import instance from "../../axios/instance";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/Slices/taskSlice";

import  "./Services.css"

function TaskList({ tasks, onEdit, onTaskDeleted }) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await instance.delete(`/tasks/${taskId}`);
      dispatch(deleteTask(data));

      toast.success(data?.message || "Task deleted successfully!");
      onTaskDeleted(taskId);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.taskStatus === filter;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.taskStatus === "pending").length,
    completed: tasks.filter((t) => t.taskStatus === "completed").length,
  };

  return (
    <div className="task-list-section">
      <div className="task-section-heading">
        <div>
          <span className="section-subtitle">YOUR WORKSPACE</span>
          <h4>Your Tasks</h4>
          <p>Manage everything you need to get done.</p>
        </div>

        <div className="task-count">
          {filteredTasks.length} {filteredTasks.length === 1 ? "Task" : "Tasks"}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="task-filter-bar">
        {["all", "pending", "completed"].map((status) => (
          <button
            key={status}
            type="button"
            className={`filter-pill ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            <span className="filter-label">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="filter-count">{counts[status]}</span>
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-task">
          <div className="empty-task-icon">📝</div>

          <h5>
            {tasks.length === 0
              ? "No tasks yet!"
              : `No ${filter} tasks`}
          </h5>

          <p>
            {tasks.length === 0
              ? "Your workspace is empty. Create your first task and start being productive."
              : `You don't have any ${filter} tasks right now.`}
          </p>
        </div>
      ) : (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <Card className="task-item-card" key={task._id}>
              <Card.Body>
                <div className="task-card-top">
                  <Badge
                    bg={task.taskStatus === "completed" ? "success" : "warning"}
                    text={task.taskStatus === "completed" ? "light" : "dark"}
                    className="task-status-badge"
                  >
                    {task.taskStatus}
                  </Badge>

                  <span className="task-card-dot">●</span>
                </div>

                <h5
                  className={
                    task.taskStatus === "completed"
                      ? "task-title completed-title"
                      : "task-title"
                  }
                >
                  {task.taskTitle}
                </h5>

                <p className="task-description">{task.taskDesc}</p>

                <div className="task-card-actions">
                  <Button
                    variant="outline-primary"
                    className="task-edit-btn"
                    onClick={() => onEdit(task)}
                  >
                    ✎ Edit
                  </Button>

                  <Button
                    variant="outline-danger"
                    className="task-delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    🗑 Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;