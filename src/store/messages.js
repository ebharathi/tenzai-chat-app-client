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
              //we use this becoz im updating like for a msg if it already exits 
              let isFound=false;
              state.msg.map((single)=>{
                 if(single.msgId==data.msgId)
                 {
                    isFound=true;
                    tempArr.push(data)
                 }
                 else
                   tempArr.push(single)
              })
              //if msg doesn't exist already,then add it
              if(isFound==false)
                tempArr.push(data)
              state.msg=tempArr
        },
        deleteMsg:(state,action)=>{
               let tempArr=[]

               console.log("arr before delete-->",action.payload.data,"---->",state.msg)
               state.msg.map((single)=>{
                  if(single.msgId!=action.payload.data.msgId)
                     tempArr.push(single)
               })
               state.msg=tempArr;
        }
    }
})

export const  {updateMsg,deleteMsg}=messages.actions;
export default messages.reducer;