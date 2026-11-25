import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
name:"userSlice",
initialState:{
user:JSON.parse(localStorage.getItem("user") || null),
 isAuthenticated: !!localStorage.getItem("user"),
  },

reducers:{ 

userRegister:(state,action)=>{
state.user = action.payload.user || action.payload;
localStorage.setItem("user",JSON.stringify(state.user));

},
 userLogin: (state, action) => {
            state.user = action.payload.user || action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },

        userLogout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },





}

});

export const {userRegister,userLogin,userLogout} = userSlice.actions;

export default userSlice.reducer;