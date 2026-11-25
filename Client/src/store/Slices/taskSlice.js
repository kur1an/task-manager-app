
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,

  reducers: {
    // Add Task
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    // Edit Task
    editTask: (state, action) => {
      const updatedTask = action.payload;

      const index = state.tasks.findIndex(
        (task) => task._id === updatedTask._id
      );

      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },

    // Delete Task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload
      );
    },

    // Get All Tasks
    getAllTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  getAllTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
