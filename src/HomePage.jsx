import Logo from "./assets/logo.png";
import HomeCompass from "./assets/HomeCompass.png";
import ArrowHead from "./assets/ArrowHead.png";
import Profile from "./assets/Profile.png";

function HomePage(){
    return (   
        <div className=" w-screen h-screen " style={{
            background: 'linear-gradient(to bottom, rgba(0, 102, 153, 0.4) 0%, rgba(0, 85, 128, 1) 50%, rgba(0, 68, 102, 0.56) 100%)'}}>
            <div className="h-[60px] w-full bg-[#006699] ">
                <div className="h-full flex items-center px-6 sm:px-5 md:px-10  justify-between">
                        <div className="flex items-center h-full">
                            <img src={Logo} className="h-[80%]" alt="" />
                            <h1 style={{ fontFamily: 'Brans' }} className="text-3xl ml-2 text-white">
                                Compass
                            </h1>
                            </div> 
                            <div className="flex w-[40%] h-full justify-between items-center font-brans text-white text-xl">
                                <h1>Trip Planner</h1>
                                <h1>Destinations</h1>
                                <h1>Travel Logs</h1>
                                <img className="h-[70%]" src={Profile} alt="" />
                            </div>                               
                </div>
                <div className="pt-10 flex flex-row items-center justify-center">
                    <div className="w-[50%] text-center px-10 flex flex-col items-center">
                        <h1 className="font-outfit text-5xl text-white font-medium">Welcome to</h1>
                        <h1 className= "text-[60px] font-black text-[#FFCC66]" style={{ fontFamily: 'Brans' }} >C O M P A S S</h1>
                        <p className="font-outfit text-white">Discover over 1,500 epic adventures—ride towering ocean waves, fish for piranhas in the Amazon, and so much more. Your next thrill starts here!</p>
                        <button className="text-white mt-10 px-8 py-2 border-[2px] border-[#FFCC66] flex flex-row items-center gap-2 text-xl">Get Started <img className="h-[20px]" src={ArrowHead} alt="" /></button>
                    </div>
                    <div className="w-[50%] flex items-center justify-center">
                        <img className="w-[80%]" src={HomeCompass} alt="" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage;