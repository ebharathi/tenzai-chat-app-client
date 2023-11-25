import { createSlice } from "@reduxjs/toolkit";


const userData=createSlice({
    name:'user',
    initialState:{
        id:'abc_2',
        name:'User-one',
        bg:'bg-blue-500'
    },
    reducers:{
        updateId: (state, action) => {
            return { ...state, id: action.payload.id };
          },
          updateName: (state, action) => {
            console.log("UPDATING NAME TO ", action.payload);
            return { ...state, name: action.payload.name };
          },
          updateUserProfileBackground: (state, action) => {
            console.log("UPDATING COLOR OF BACKGROUND TO ", action.payload);
            return { ...state, bg: action.payload.bg };
          },
    }
})

export const {updateId,updateName,updateUserProfileBackground}=userData.actions
export default userData.reducer