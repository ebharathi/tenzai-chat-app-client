import { useState,useEffect } from "react";
//importing redux
import { useDispatch,useSelector } from "react-redux";
import { updateId, updateName ,updateUserProfileBackground} from "../../store/data";
const color=[
    'bg-blue-500',
    'bg-[#b54410]',
    'bg-red-500',
    'bg-[#0da8a6]',
    'bg-green-500',
    'bg-[#c2105a]',
    'bg-black',
    'bg-[#94238e]',
    'bg-[#5314a6]',
    'bg-[#d4ac0d]',
    'bg-[#10c257]'
]
const ProfileComponent=({socket})=>{
    const dispatch=useDispatch();
    //getting the user's data from user redux store
    const name=useSelector((state)=>state.user.name)
    const bg=useSelector((state)=>state.user.bg)
    
    const [currentBg,setCurrentBg]=useState(0)
    const [nickName,setNickName]=useState("");
    //update name of the user
    const changeName=(val)=>{
        dispatch(updateName({name:val}))
    }
    //update bg color of the profile
    const changeColor=(val)=>{
        if(val+1>10)
        {
            dispatch(updateUserProfileBackground({bg:color[0]}))
            socket.emit('setNewUser',{id:socket.id,username:name,bg:color[0]})
            setCurrentBg(0)
        }
        else
        {
            dispatch(updateUserProfileBackground({bg:color[val]}))
            setCurrentBg(currentBg+1);
            socket.emit('setNewUser',{id:socket.id,username:name,bg:color[val]})
        }
    }
    useEffect(()=>{
        if(name!=""&&name.length>=1)
        {
            setNickName(name.substring(0,2).toUpperCase())
            dispatch(updateId({id:socket.id}))
            socket.emit('setNewUser',{id:socket.id,username:name,bg:bg})
        }
    },[name])
    return (
        <div className="grid grid-cols-5 border-b-1 border-[#777877]">
             <div className="col-span-1 flex justify-end items-center py-2">
                 <div className={`cursor-pointer ${bg} rounded-circle w-20 h-20 text-[38px] text-white flex justify-center items-center`} onClick={()=>changeColor(currentBg)}>
                   {nickName}
                 </div>
             </div>
             <div className="col-span-1 px-3 flex justify-left items-center ">
                 <input maxLength={15} className="bg-transparent outline-none text-[40px]" type="text" value={name||''} onChange={(e)=>changeName(e.target.value)}/>
             </div>
        </div>    
    )
}
export default ProfileComponent;