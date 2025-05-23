import Nav from "./Nav";
import AddImg from "./assets/AddImage.png"
function TravelLogs() {
  return (
    <>
        <Nav/>
        <div className="w-full min-h-screen pt-[100px] flex flex-col items-center font-outfit" style={{ background: 'linear-gradient(to bottom, rgba(255, 204, 102, 0.17), rgba(255, 204, 102, 0.68))' }}>
            <div className="w-[90%]">
                <h1>Travel Logs</h1>
            </div>
            <div className="w-[90%] h-[350px] bg-[#FFF6F6] flex flex-col items-center">
                <div className="w-[95%]">
                    <h5>Date today</h5>
                </div>
                <div className="w-full flex flex-col items-center gap-3 mt-4">
                    <input className="w-[95%]" type="text" placeholder="Enter title"/>
                    <input className="w-[95%]" type="text" placeholder="Enter Description"/>
                </div>
                <div className="w-[95%] h-[40%] mt-[20px] flex flex-col items-start">
                    <img className=" h-[100%]" src={AddImg} alt="" />
                    <div className="w-[100%] flex flex-row items-end justify-end">
                        <button className="bg-[#993300] text-[#FFCC66] px-4 py-2">Post</button>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  );
}

export default TravelLogs;