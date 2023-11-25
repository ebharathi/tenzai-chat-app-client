import { createSlice } from "@reduxjs/toolkit";

const messages=createSlice({
    name:'message',
    initialState:{
        msg:[]
    },
    reducers:{
        updateMsg:(state,action)=>{
              const { data } = action.payload;
              let tempArr=[];
              let isFound=false;
              state.msg.map((single)=>{
                 if(single.msgId==data.msgId)
                 {
                    isFound=true;
                    console.log("FOUND--->",data)
                    tempArr.push(data)
                 }
                 else
                   tempArr.push(single)
              })
              if(isFound==false)
                tempArr.push(data)
              console.log("temp arr---->",tempArr)
              state.msg=tempArr
        }
    }
})

export const  {updateMsg}=messages.actions;
export default messages.reducer;