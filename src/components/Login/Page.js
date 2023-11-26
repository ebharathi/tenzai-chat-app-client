import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateId, updateName, updateUserProfileBackground } from "../../store/data";
import { useNavigate } from "react-router-dom";

const color=[
    'bg-[#696969]',
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
const LoginPage=({socket})=>{
    //for navigaton
    const Navigate=useNavigate()
    //from redux store
    const dispatch=useDispatch();
    const username=useSelector((state)=>state.user.name)
    const profileColor=useSelector((state)=>state.user.bg);
    const [currentColor,setCurrentColor]=useState(0);
    const [error,setError]=useState("");
    //change profile colour
    const changeProfileColour=(position)=>{
        if(position>10)
        {
            dispatch(updateUserProfileBackground({bg:color[0]}))
            setCurrentColor(0);
        }
        else
        {
            dispatch(updateUserProfileBackground({bg:color[position+1]}))
            setCurrentColor(currentColor+1);
        }
    }
    //handle submit function
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(username==""||username.length<2)
        {
              setError("Please Enter valid username!");
              setTimeout(() => {
                 setError("")
              }, 3000);
              return;
        }
        dispatch(updateId({id:socket.id}))
        //emitting to socket that a new user is there
        socket.emit('setNewUser',{id:socket.id,username:username,bg:profileColor})
        Navigate('/home')
    }
    return (
        <div className="bg-[#aeaeae] h-full flex justify-center items-center relative">
              <div className="py-20 px-16    bg-[#FFFFFF] rounded-lg relative">
                        <form>
                              <div className="flex justify-center mb-3">
                                   <div onClick={()=>changeProfileColour(currentColor)} className={`${profileColor} cursor-pointer rounded-circle w-40 h-40 flex items-center justify-center text-white text-[40px]`}>
                                          {username!=""&&username.length>1&&username.substring(0,2).toUpperCase()}
                                   </div>
                              </div>
                              <input onChange={(e)=>dispatch(updateName({name:e.target.value}))} value={username} type="text" placeholder="username" className="outline-none px-5 py-2 my-3 border-1 border-[#aeaeae] rounded-lg"/>
                              <div className="text-[11px] text-red-500 my-3 text-center">
                                {error}
                              </div>
                              <div className="text-center my-2">
                                 <button onClick={(e)=>handleSubmit(e)} className={`${profileColor} text-white hover:text-[#696969] hover:bg-white hover:border-1 hover:border-[#696969]  px-5 py-2 rounded-md`}>LET'S CHAT !</button>
                              </div>
                        </form>
                        <div className="absolute bottom-2 ">
                            <span className="text-[10px]">*Change your profile colour by clicking the circle above</span>
                        </div>
              </div>
        </div>    
    )
}

export default LoginPage;