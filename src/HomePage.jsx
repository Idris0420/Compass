import HomeCompass from "./assets/HomeCompass.png";
import ArrowHead from "./assets/ArrowHead.png";
import Separator from "./assets/Separator.png";
import First from "./assets/LearnMoreAboutImg/First.png";
import Second from "./assets/LearnMoreAboutImg/Second.png";
import Third from "./assets/LearnMoreAboutImg/Third.png";
import Featured from "./assets/LearnMoreAboutImg/Featured.png";
import Sign from "./assets/LearnMoreAboutImg/Sign.png";

import Nav from "./Nav";



function HomePage(){
    return (   
        <>
            <div className=".text-light-shadow w-full min-h-screen " style={{
                background: 'linear-gradient(to bottom, rgba(0, 102, 153, 0.4) 0%, rgba(0, 85, 128, 1) 50%, rgba(0, 68, 102, 0.56) 100%)'}}>
                    <Nav />
                    <div className="pt-[80px] flex flex-row items-center justify-center">
                        <div className="w-[50%] text-center px-40 flex flex-col items-start">
                            <h1 className="font-outfit text-5xl text-white font-medium">Welcome to</h1>
                            <h1 className= "text-[60px] font-bold text-[#FFCC66] font-Brans">C O M P A S S</h1>
                            <p className="font-outfit text-white text-left">Discover over 1,500 epic adventures—ride towering ocean waves, fish for piranhas in the Amazon, and so much more. Your next thrill starts here!</p>
                            <button className="text-white mt-10 px-8 py-2 border-[2px] border-[#FFCC66] flex flex-row items-center gap-2 text-xl hover:scale-[1.2] transition-transform duration-300">Get Started <img className="h-[15px] w-[15px]" src={ArrowHead} alt="" /></button>
                        </div>
                        <div className="w-[50%] flex items-center justify-center">
                            <img className="w-[80%]" src={HomeCompass} alt="" />
                        </div>
                        
                    </div>
                    <div className="w-full mt-[20px]">
                       <img className="h-[100px] w-full" src={Separator} alt="" />
                    </div>
                    <div className="mt-10 w-full h-[60px]"><img className="h-full" src={Sign} alt="" /></div>
                    <div className="w-full h-screen px-[50px] flex flex-row items-center justify-between">
                        <div className="w-[70%] h-[70%] flex flex-col justify-around">
                            <div className="px-10 bg-[#FFF6F6] border border-[#993300] h-[30%] flex justify-center items-center gap-10 font-outfit  ">
                                <div><img className="w-[400px]" src={First} alt="" /></div>
                                <div className="flex flex-col gap-3 text-vlight-shadow">
                                    <h1 className="text-[#993300] font-bold text-2xl">Fly Fishing Rocking Mountains</h1>
                                    <p>You’ll be led by a seasoned guide through every twist and turn of the journey—and yes, there’ll be an endless supply of dehydrated ravioli to keep your spirit (and stomach) strong. Adventure awaits!</p>
                                </div>
                            </div>
                            <div className="px-10 bg-[#FFF6F6] border border-[#993300] h-[30%] flex justify-center items-center gap-10 font-outfit  ">
                                <div><img className="w-[490px]" src={Second} alt="" /></div>
                                <div className="flex flex-col gap-3 text-vlight-shadow">
                                    <h1 className="text-[#993300] font-bold text-2xl">Level 5 Rapids</h1>
                                    <p>Strap on your helmet and grab your wetsuit—this isn’t just a trip, it’s a full-blown expedition into the heart of Siberia.  With courage in your chest and a seasoned guide by your side, you're not just heading into the wild... you're going to conquer it.</p>
                                </div>
                            </div>
                            <div className="px-10 bg-[#FFF6F6] border border-[#993300] h-[30%] flex justify-center items-center gap-10 font-outfit  ">
                                <div><img className="w-[590px]" src={Third} alt="" /></div>
                                <div className="flex flex-col gap-3 text-vlight-shadow">
                                    <h1 className="text-[#993300] font-bold text-2xl">Puget Sound Kayaking</h1>
                                    <p>Spend one unforgettable week ocean kayaking through the wild beauty of the Puget Sound. Paddle past misty islands, glide alongside curious seals, and embrace the rhythm of the open water. With each sunrise and every wave, you’ll discover just how thrilling the edge of the wild can be.</p>
                                </div>
                            </div>                            
                        </div>
                        <div className="w-[27%] h-[90%]  font-outfit flex flex-col gap-9 items-center justify-center text-white text-vlight-shadow">
                            <div className="h-[40px] flex items-center justify-center font-bold font-outfit bg-[#993300] w-full "><h1>FEATURED DESTINATION</h1></div>
                            <div className="bg-[#FFCC66] flex flex-col items-start items-center h-[80%] pt-10">
                                <div className="w-full flex items-center justify-center px-10">
                                    <img className="w-full" src={Featured} alt="" />
                                </div>
                                <div className="px-2 pt-1 w-[80%] flex flex-col items-center justify-center text-black">
                                    <div>
                                        <h1 className="text-[#993300] font-bold text-2xl">Yosemite</h1>
                                        <h5 className="mt-2 font-bold">For exprerts only.</h5>
                                        <p className="mt-1 text-sm">Sign up now to scale the iconic heights of El Capitan and Half Dome. This is the real deal—no hand-holding, just raw rock, epic views, and pure adrenaline. Bring your own gear. We’ll fuel you with meals and prep you with a one-hour training video to get you ready for the climb of a lifetime.</p>                                
                                    </div>
                                    <div className="w-full mt-9">
                                        <button className="px-5 py-2 bg-[#993300] text-[#FFCC66]  flex flex-row items-center gap-2 shadow-lg  hover:scale-[1.2] transition-transform duration-300">More details <img src={ArrowHead} className="h-[20px]" alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
            </div>
        </>
    )
}

export default HomePage;