import { createSlice } from "@reduxjs/toolkit";


const userData=createSlice({
    name:'user',
    initialState:{
        id:'',
        name:'',
        bg:'bg-[#696969]'
    },
    reducers:{
        updateId: (state, action) => {
            return { ...state, id: action.payload.id };
          },
          updateName: (state, action) => {
            return { ...state, name: action.payload.name };
          },
          updateUserProfileBackground: (state, action) => {
            return { ...state, bg: action.payload.bg };
          },
    }
})

export const {updateId,updateName,updateUserProfileBackground}=userData.actions
export default userData.reducer