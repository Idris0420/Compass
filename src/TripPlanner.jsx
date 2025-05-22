import { useState } from 'react';
import MapSelector from './MapSelector.jsx'
import Logo from './assets/Logo.png';
import Profile from './assets/Profile.png';
import Steps from './assets/TripPlannerImg/Steps.png';

function TripPlanner() {
  const [position, setPosition] = useState(null);

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom, #FFCC66 0%, #FFCC66 50%, #FF9966 100%)' }}>
      {/* Navigation bar */}
      <div className="h-[60px] w-full bg-[#006699] fixed z-10">
        <div className="h-full flex items-center px-6 sm:px-5 md:px-10 justify-between">
          <div className="flex items-center h-full">
            <img src={Logo} className="h-[80%]" alt="Compass Logo" />
            <h1 style={{ fontFamily: 'Brans' }} className="text-3xl ml-2 text-white">Compass</h1>
          </div>
          <div className="font-md flex w-[40%] h-full justify-between items-center font-brans text-white text-xl">
            <h1>Trip Planner</h1>
            <h1>Destinations</h1>
            <h1>Travel Logs</h1>
            <img className="h-[70%]" src={Profile} alt="Profile Icon" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full h-full pt-[100px] flex flex-col items-center justify-start'>
        <div className='w-[80vw] font-outfit'>
          <h1 className='text-3xl font-bold text-[#006699]'>Adventure Planner</h1>
          <p>A complete tool for planning your adventure, ensuring you are fully prepared and informed before, during, and after your travel.</p>
        </div>

        <div className='flex items-center flex-col gap-[40px] w-[80vw] '>
          <div className='w-full h-[500px] mt-[40px] rounded-md overflow-hidden'>
            <MapSelector position={position} setPosition={setPosition} />
          </div>

          <div className='flex flex-row w-[80vw]'>
            <div className='min-w-[75px]'>
              <img src={Steps} alt="" />
            </div>
            <div className='w-[80vw] h-screen '>
              <div className=' h-[275px] px-10 pt-1'>
                <div className='flex flex-col'>
                  <h1 className='font-bold text-2xl'>Destination</h1>
                  <p>Enter the City and the Country or Region name in the input field.</p>
                </div>
                <div className='flex flex-row  mt-3 justify-between'>
                  <div className=' w-[40%]'>
                    <h2 className='text-[15px]'>City or Closest Major City</h2>
                    <input className='w-full' type="text" />
                  </div>
                  <div className=' w-[40%]'>
                    <h2 className='text-[15px]'>Country or Region</h2>
                    <input className='w-full' type="text" />
                  </div>
                  <button className='bg-[#993300] text-[#FFCC66] px-5'>Search and Pin</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default TripPlanner;
