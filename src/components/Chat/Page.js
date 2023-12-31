import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {  deleteMsg, updateMsg } from '../../store/messages';

const ChatPage=({socket})=>{
    const {id}=useParams()
    const dispatch=useDispatch()
    const [text,setText]=useState("");
    const myName=useSelector((state)=>state.user.name)
    const myBg=useSelector((state)=>state.user.bg)
    const msgList=useSelector((state)=>state.messages.msg);
    const handleKeyPresses=(event)=>{
         if(event.key=="Enter"&&text!="")
         {
            console.log("[+]Enter key pressed....")
            sendMessage();
         }
    }
    const sendMessage=async()=>{
        const randomDecimal = Math.random();
        const randomNumber = Math.floor(randomDecimal * 1e15);
        let msg={
            id:id,
            msgId:randomNumber,
            owner:myName,
            bg:myBg,
            message:text,
            liked:false,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            
        }
        if(text!="")
        {
            socket.emit('send_message',msg)
            setText("");
            dispatch(updateMsg({data:msg}));
        }

    }
    const updateLike=(index,single)=>{
         single={...single,liked:!single.liked}
         dispatch(updateMsg({data:single}))
         socket.emit('liked_message',single);
    }
    const deleteMessage=(single)=>{
          dispatch(deleteMsg({data:single}))
          socket.emit('delete_message',single);
    }
    socket.off('receive_message').on('receive_message',(data)=>{
        console.log("received msg-->",data)
        let msg={
            id:data.id,
            msgId:data.msgId,
            owner:data.owner,
            bg:data.bg,
            message:data.message,
            liked:data.liked,
            time:data.time
        }
        dispatch(updateMsg({data:msg}))
    })
    socket.off('receive_deleted_message').on('receive_deleted_message',(data)=>{
        console.log("deleted msg-->",data)
        dispatch(deleteMsg({data:data}))
    })
    useEffect(()=>{
        console.log("updated msg array-->",msgList)
    },[msgList])
    return (
        <div className="grid grid-cols-7 bg-[#aeaeae] h-full ">
        <div className="col-span-0 lg:col-span-2"></div>
        <div className="col-span-7 lg:col-span-3 p-10">
            <div className="relative custom-vh flex flex-col rounded-xl">
                <div className='overflow-y-scroll h-full bg-white rounded-xl p-5'>
                    {
                      msgList.map((single,index)=>single.id==id&&
                      <div className={`col-span-1 ${single.owner==myName?'text-right':'text-left'} py-1`}>
                           {
                            single.owner==myName&&
                            <span className='text-[#6f6b6b]'>
                                   <DeleteIcon fontSize='small' className='cursor-pointer' onClick={()=>deleteMessage(single)}/>
                            </span>
                           }
                          {
                            single.owner!=myName&&
                            <span className={`${single.bg} mr-1 rounded-circle px-2 py-1 text-white`}>{single.owner.substring(0,2).toUpperCase()}</span>
                           }
                           <span className={`${single.bg} px-3 py-1  rounded-lg text-white cursor-pointer`}>
                              <span className=''>{single.message}</span>
                              <span className='text-white text-[10px] ml-2'>{single.time}</span>
                           </span>
                           {
                            single.owner!=myName?
                            <span>
                                {
                                    !single.liked?
                                    <span className=''>
                                            <FavoriteBorderOutlinedIcon color='action' className='cursor-pointer' fontSize='small' onClick={()=>updateLike(index,single)}/>
                                    </span>
                                    :
                                    <span className='text-pink-600 '>
                                            <FavoriteIcon  className='cursor-pointer' fontSize='small' onClick={()=>updateLike(index,single)}/>
                                    </span>
                                }
                            </span>
                            :
                            <span className='relative'>
                                 {
                                    single.liked&&
                                    <span className='text-pink-600 absolute  left-[-12px] top-3'>
                                            <FavoriteIcon fontSize='small'/>
                                    </span>
                                 }
                            </span>
                           }
                          
                           {
                            single.owner==myName&&
                            <span className={`${single.bg} ml-1 rounded-circle px-2 py-1 text-white`}>{single.owner.substring(0,2).toUpperCase()}</span>
                           }
                      </div>  
                      )      
                    }
                </div>
                 <div className='absolute bottom-4 right-1  w-[97%] rounded-lg  border-1 border-[#9a9b9c]  bg-white flex'>
                    <input onKeyDown={(e)=>handleKeyPresses(e)} value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder="Enter message here..." className="w-full outline-none px-3 py-5"/>
                    <div className='flex justify-center items-center mr-3'>
                      <SendIcon className='cursor-pointer' fontSize='large' color='primary' onClick={sendMessage} />
                    </div>
                 </div>
            </div>
        </div>
        <div className="lg:col-span-2"></div>
   </div>
    )
}
export default ChatPage;