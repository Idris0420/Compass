import Nav from "./Nav";
import SampleProfile from "./assets/SampleProfile.jpg";
function Profile(){
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
                                <h1 className="text-[#006699] text-[32px]">Name</h1>
                                <h2 className="text-[24px]">"name"</h2>
                            </div>
                            <div className="">
                                <h1 className="text-[#006699] text-[32px]">Email Address</h1>
                                <h2 className="text-[24px]">"email"</h2>
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
                            <tr>
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