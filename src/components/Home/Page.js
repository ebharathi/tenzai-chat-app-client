//import compoents
import ProfileComponent from "./Profile";
import UsersComponent from "./Users";

const HomePage=({socket})=>{
    return(
        <div className=" relative">
             <div className="absolute top-0 right-0">
                       <ProfileComponent socket={socket}/>
             </div>
             <div className="">
                 <div className="pt-20 px-3 py-2 rounded-xl">
                       <UsersComponent socket={socket}/>
                 </div>
             </div>
        </div>
    )
}
export default HomePage;