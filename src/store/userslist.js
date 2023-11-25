import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const usersList=createSlice({
    name:'userlist',
    initialState:{
        list:[]
    },
    reducers:{
        updateList:(state,action)=>{
            console.log("data--->",action.payload)
            state.list=action.payload.data.filter((item)=>item.id!=action.payload.myId)
        }
    }
})

export const {updateList} =usersList.actions
export default usersList.reducer