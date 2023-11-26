//importing redux
import { useSelector } from "react-redux";

const ProfileComponent=({socket})=>{
    //getting the user's data from user redux store
    const name=useSelector((state)=>state.user.name)
    const bg=useSelector((state)=>state.user.bg)
   
    return (
        <div className="grid grid-cols-5 border-b-1 border-[#777877]">
             <div className="col-span-1 flex justify-end items-center py-2">
                 <div className={`cursor-pointer ${bg} rounded-circle w-20 h-20 text-[38px] text-white flex justify-center items-center`}>
                   {name.substring(0,2).toUpperCase()}
                 </div>
             </div>
             <div className="col-span-1 px-3 flex justify-left items-center  text-[40px]">
               {name}
             </div>
        </div>    
    )
}
export default ProfileComponent;