import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { updateList } from "../../store/userslist"
const UsersComponent=({socket})=>{
    const Navigate=useNavigate();
    const dispatch=useDispatch()
    const list=useSelector((state)=>state.userList.list)
    socket.on('userConnected',(data)=>{
         console.log("USERS LIST ARRAY---->",data) 
         dispatch(updateList({myId:socket.id,data:data}))
    })
    const joinChatRoom=async(id,name)=>{
        let room_id='';
        if(id[0]<socket.id[0])
           room_id=id+socket.id
        else
           room_id=socket.id+id
        socket.emit("join_room",room_id);
        Navigate(`/chat/${room_id}`);
    }
    return (
        <div className="px-5 grid grid-cols-5 space-x-1 space-y-1">
            {
                list.map((item)=>
                <div className={`${item.bg} rounded-xl h-40  col-span-1 my-2 py-1 px-10 grid grid-cols-3 relative`}>
                     <div className="col-span-1 flex items-center">
                        <div className={` bg-white rounded-circle w-20 h-20 text-[35px] text-black flex justify-center items-center`}>
                            {item.username.substring(0,2).toUpperCase()}
                        </div>
                     </div>   
                     <div className='col-span-2 flex items-center justify-start text-[25px]'>
                        <span>{item?.username}</span>
                     </div>
                    <button onClick={()=>joinChatRoom(item?.id,item.username)} className="absolute bottom-2 right-2 text-white hover:text-black">
                            <ChatIcon fontSize='large' color=""/>
                        </button>
                </div>    
                )
            }
        </div>
    )
}
export default UsersComponent;