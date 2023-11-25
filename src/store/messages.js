import { createSlice } from "@reduxjs/toolkit";

const messages=createSlice({
    name:'message',
    initialState:{
        msg:[]
    },
    reducers:{
        //to add a new msg and also to update like for a paticular msg
        updateMsg:(state,action)=>{
              const { data } = action.payload;
              let tempArr=[];
              let isFound=false;
              state.msg.map((single)=>{
                //code for updating like for a message. since the msg is already present in the array, i replace tat particular msg with new like=true value(presnt inside payload.data).
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
              //updating the messages array
                state.msg=tempArr
        },
        //to delete a msg
        deleteMsg:(state,action)=>{
               let tempArr=[]
               console.log("arr before delete-->",action.payload.data,"---->",state.msg)
               state.msg.map((single)=>{
                //deleting the message with the unique id called 'msgId'
                  if(single.msgId!=action.payload.data.msgId)
                     tempArr.push(single)
               })
               state.msg=tempArr;
        }
    }
})

export const  {updateMsg,deleteMsg}=messages.actions;
export default messages.reducer;