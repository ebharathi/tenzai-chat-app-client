//importing redux
import { useSelector } from "react-redux";

const ProfileComponent=({socket})=>{
    //getting the user's data from user redux store
    const name=useSelector((state)=>state.user.name)
    const bg=useSelector((state)=>state.user.bg)
   
    return (
        <div className="mr-2">
             <div className="flex justify-end items-center py-2">
                 <div className={`cursor-pointer ${bg} rounded-circle w-16 h-16 text-[38px] text-white flex justify-center items-center`}>
                   {name.substring(0,2).toUpperCase()}
                 </div>
             </div>
        </div>    
    )
}
export default ProfileComponent;