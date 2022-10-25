import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
       auth:false
    },
    reducers: {
        logout(state,action){
            
        },
        login(state,action){

        }
    },
  });

  export  const authactions = authSlice.actions
  export default  authSlice