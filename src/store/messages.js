import { createSlice } from "@reduxjs/toolkit";

const messages=createSlice({
    name:'message',
    initialState:{
        msg:[]
    },
    reducers:{
        updateMsg:(state,action)=>{
              state.msg.push(action.payload.data)
        }
    }
})

export const  {updateMsg}=messages.actions;
export default messages.reducer;