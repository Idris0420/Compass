import Logo from "./assets/logo.png";
import Profile from "./assets/Profile.png";
import { Link } from "react-router-dom";

function Nav(){
    return (
        <div className="h-[60px] w-full bg-[#006699] fixed">
                    <div className="h-full flex items-center px-6 sm:px-5 md:px-10  justify-between">
                            <div className="flex items-center h-full">
                                <img src={Logo} className="h-[80%]" alt="" />
                                <h1 style={{ fontFamily: 'Brans' }} className="text-3xl ml-2 text-white">
                                    Compass
                                </h1>
                            </div> 
                            <div className="flex w-[40%] h-full justify-between items-center font-brands text-white text-xl">
                                <Link to="/trip-planner" className="cursor-pointer hover:scale-125 transition-transform duration-300">
                                    Trip Planner
                                </Link>
                                <h1 className="cursor-pointer hover:scale-125 transition-transform duration-300">
                                    Destinations
                                </h1>
                                <h1 className="cursor-pointer hover:scale-125 transition-transform duration-300">
                                    Travel Logs
                                </h1>
                                <Link to="/profile" className="h-full flex items-center w-auto">
                                    <img className="h-[70%] cursor-pointer hover:scale-125 transition-transform duration-300" src={Profile} alt="Profile" />
                                </Link>
                            </div>
                    </div>                           
                </div>
    );
}

export default Nav;