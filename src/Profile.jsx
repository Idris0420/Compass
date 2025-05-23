import Nav from "./Nav";
import SampleProfile from "./assets/SampleProfile.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

function Profile(){

    const navigate = useNavigate();
    // Logout function to remove cookie and navigate to login

    const handleLogout = () => {
        Cookies.remove("userEmail"); // Remove the cookie
        navigate("/"); // Navigate back to login page
    };

    return(
        <>
        
            <div className="w-full min-h-screen ">
                <Nav/>
                <div className="pt-[90px] flex flex-col px-[5%] ">
                    <div>
                        <h1 className="font-outfit text-5xl font-bold text-[#006699]">Profile</h1>
                    </div>
                    <div className="flex flex-row h-[270px] w-full gap-10 font-outfit mt-[40px]">
                        <img className="rounded-full h-full border-[5px] border-[#006699]" src={SampleProfile} alt="" />
                        <div className=" flex flex-col justify-center">
                            <div className="">
                                <h1 className="text-[#006699] text-[32px] font-bold">Name</h1>
                                <h2 className="text-[24px]">"name"</h2>
                            </div>
                            <div className="">
                                <h1 className="text-[#006699] text-[32px] font-bold">Email Address</h1>
                                <h2 className="text-[24px]">"email"</h2>
                            </div>
                            <div>
                                <button onClick={handleLogout} className="px-3 py-1 rounded hover:scale-125 transition-transform duration-300 text-white bg-red-500">Log Out</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[40px] border-b-[10px] border-[#006699] pb-[10px] flex flex-row justify-between items-center">
                        <h1 className="font-outfit text-3xl font-bold text-[#006699]">Adventure Planner History</h1>
                        <h1 className="text-[#993300] font-medium hover:underline cursor-pointer">Clear History</h1>
                    </div>
                    <div>
                    <table className="w-full h-5 mt-5">
                        <thead>
                            <tr className="text-[#006699]">
                                <th>No.</th>
                                <th>Date</th>
                                <th>Destination</th>
                                <th>Activity</th>
                                <th>Information</th>
                            </tr>
                        </thead>
                    </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;