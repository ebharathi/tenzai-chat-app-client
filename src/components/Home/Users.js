import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { updateList } from "../../store/userslist"
const UsersComponent=({socket})=>{
    const Navigate=useNavigate();
    const dispatch=useDispatch()
    const list=useSelector((state)=>state.userList.list)
    const [isempty,setIsempty]=useState(false);
    socket.on('userConnected',(data)=>{
         console.log("USERS LIST ARRAY---->",data) 
         dispatch(updateList({myId:socket.id,data:data}))
    })
    const joinChatRoom=async(id)=>{
        let room_id='';
        if(id[0]<socket.id[0])
           room_id=id+socket.id
        else
           room_id=socket.id+id
        socket.emit("join_room",room_id);
        Navigate(`/chat/${room_id}`);
    }
    return (
        <div className="px-5 grid grid-cols-2">
            {
                list.map((item)=>
                <div className="col-span-1 my-2 py-1 px-10 grid grid-cols-2">
                     {/* <div className="col-span-2">
                     </div>   
                     <div className={`col-span-1 ${item.bg}  rounded-circle w-12 h-12 text-[20px] text-white flex justify-center items-center`}>
                        {item.username.substring(0,2).toUpperCase()}
                     </div>
                     <div className="col-span-2 flex items-center text-[20px]">
                       <span>{item.username}</span>
                     </div>
                     <div className="col-span-1">
                         <a className="bg-green-500 px-3 py-1 rounded-md">CHAT</a>
                     </div>
                     <div className="col-span-2">
                     </div> */}
                     <div className="col-span-1">
                        <div className={` ${item.bg}  rounded-circle w-20 h-20 text-[20px] text-white flex justify-center items-center`}>
                            {item.username.substring(0,2).toUpperCase()}
                        </div>
                        <h1 className="pt-5">{item.username}</h1>
                     </div>   
                     <div className="flex flex-col">
                           <div className="text-center mt-10">
                           <button onClick={()=>joinChatRoom(item?.id,item.username)} className="bg-blue-500 w-24 rounded-md py-2 font-semibold">
                                    CHAT
                            </button>
                           </div>
                     </div>   
                </div>    
                )
            }
        </div>
    )
}
export default UsersComponent;