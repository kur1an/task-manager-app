import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import taskReducer from "./Slices/taskSlice";

const store = configureStore({

reducer:{
userSlice:userReducer,
taskSlice:taskReducer,

}

})

export default store;