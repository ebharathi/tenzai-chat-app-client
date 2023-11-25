import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { pink } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { updateLikeForMessage, updateMsg } from '../../store/messages';

const ChatPage=({socket})=>{
    const {id}=useParams()
    const dispatch=useDispatch()
    const [text,setText]=useState("");
    const myName=useSelector((state)=>state.user.name)
    const myBg=useSelector((state)=>state.user.bg)
    const msgList=useSelector((state)=>state.messages.msg);
    const sendMessage=async()=>{
        console.log("msg-->",text)
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
         console.log("after liking-->",single);
         dispatch(updateMsg({data:single}))
         socket.emit('liked_message',single);
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
    useEffect(()=>{
        console.log("msg-->",msgList)
    },[msgList])
    return (
        <div className="grid grid-cols-7 ">
        <div className="col-span-2"></div>
        <div className="col-span-3 p-10">
            <div className="relative chat-component flex flex-col px-3 py-2 rounded-xl">
                <div className='overflow-y-scroll h-full'>
                    {
                      msgList.map((single,index)=>single.id==id&&
                      <div className={`col-span-1 ${single.owner==myName?'text-right':'text-left'} py-1`}>
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
                 <div className='absolute bottom-2 left-1 right-2 rounded-lg  border-1 border-[#9a9b9c] w-full  bg-white flex'>
                    <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder="Enter message here..." className="w-full outline-none px-3 py-5"/>
                    <div className='flex justify-center items-center mr-3'>
                      <SendIcon className='' fontSize='large' color='primary' onClick={sendMessage} />
                    </div>
                 </div>
            </div>
        </div>
        <div className="col-span-2"></div>
   </div>
    )
}
export default ChatPage;