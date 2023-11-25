
//import compoents
import ProfileComponent from "./Profile";
import UsersComponent from "./Users";
import { useEffect } from "react";
import { useSelector } from "react-redux";
//conect to the socket backend

const HomePage=({socket})=>{
    return(
        <div className="grid grid-cols-7 border-2 border-green-400   landing-page ">
             <div className="col-span-2"></div>
             <div className="col-span-3 p-10">
                 <div className="flex flex-col px-3 py-2 rounded-xl  backdrop-filter backdrop-blur-sm">
                       <ProfileComponent socket={socket}/>
                       <UsersComponent socket={socket}/>
                 </div>
             </div>
             <div className="col-span-2"></div>
        </div>
    )
}
export default HomePage;