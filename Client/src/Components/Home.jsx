
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Components.css";
import instance from "../axios/instance";
import AddTask from "../Pages/Services/AddTask"
import EditTask from "../Pages/Services/EditTask"
import { SiGoogletasks } from "react-icons/si";
import { MdOutlinePending } from "react-icons/md";
import { GoTasklist } from "react-icons/go";

import TaskList from "../Pages/Services/TaskList"
import Header from "./Header";


function Home() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Fetch all logged-in user's tasks
useEffect(() => {
  const fetchTask = async () => {
    try {
      const { data } = await instance.get("/tasks/all-tasks");

      setTasks(data.tasks || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchTask();
}, []);

  // Add new task
  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Open edit modal
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEdit(true);
  };

  // Close edit modal
  const handleCloseEdit = () => {
    setShowEdit(false);
    setSelectedTask(null);
  };

  // Update task in UI
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === updatedTask._id
          ? updatedTask
          : task
      )
    );
  };

  // Delete task from UI
  const handleTaskDeleted = (taskId) => {
    setTasks((prev) =>
      prev.filter((task) => task._id !== taskId)
    );
  };

  // Statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.taskStatus === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.taskStatus === "pending"
  ).length;

  return (
<>
  
        <Header />
  
      <div className="home-dashboard">
  
        <div className="home-container">
  
          {/* Header */}
          <div className="dashboard-header">
  
            <div>
              <span className="section-subtitle">
                YOUR PERSONAL WORKSPACE
              </span>
  
              <h1>Dashboard</h1>
  
              <p>
                Plan your day, manage your tasks and get things done.
              </p>
            </div>
  
           
  
          </div>
  
          {/* Statistics */}
          <div className="dashboard-stats">
  
            <div className="stat-card stat-total">
              <div className="stat-icon">

<GoTasklist />

</div>
              <div>
                <span>Total Tasks</span>
                <h3>{totalTasks}</h3>
              </div>
            </div>
  
            <div className="stat-card stat-pending">
              <div className="stat-icon"><MdOutlinePending />
</div>
              <div>
                <span>Pending Tasks</span>
                <h3>{pendingTasks}</h3>
              </div>
            </div>
  
            <div className="stat-card stat-completed">
              <div className="stat-icon"><SiGoogletasks /></div>
              <div>
                <span>Completed Tasks</span>
                <h3>{completedTasks}</h3>
              </div>
            </div>
  
          </div>
  
          {/* Main Content */}
          <div className="dashboard-content">
  
            <div className="dashboard-add-task">
              <AddTask onTaskAdded={handleTaskAdded} />
            </div>
  
            <div className="dashboard-task-list">
  
              {loading ? (
  
                <div className="task-loading">
                  <div className="task-spinner"></div>
                  <p>Loading your tasks...</p>
                </div>
  
              ) : (
  
                <TaskList
                  tasks={tasks}
                  onEdit={handleEdit}
                  onTaskDeleted={handleTaskDeleted}
                />
  
              )}
  
            </div>
  
          </div>
  
        </div>
  
        {/* Edit Modal */}
       <EditTask
  key={selectedTask?._id}
  show={showEdit}
  handleClose={handleCloseEdit}
  task={selectedTask}
  onTaskUpdated={handleTaskUpdated}
/>
  
      </div>
</>
  );
}

export default Home;
