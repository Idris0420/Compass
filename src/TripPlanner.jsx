import { useState } from 'react';
import MapSelector from './MapSelector.jsx';
import Logo from './assets/Logo.png';
import Profile from './assets/Profile.png';
import Steps from './assets/TripPlannerImg/Steps.png';
import BGCompass from './assets/TripPlannerImg/BGCompass.png';

function TripPlanner() {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search and pin functionality using Nominatim API for geocoding
  const handleSearchAndPin = async () => {
    if (!city || !country) {
      setError('Please enter both city and country.');
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const query = `${city}, ${country}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
        { headers: { 'User-Agent': 'CompassTripPlanner' } }
      );
      const data = await response.json();

      if (data.length === 0) {
        setError('Location not found. Please check the city and country names.');
        return;
      }

      const { lat, lon } = data[0];
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
    } catch (err) {
      setError('Failed to fetch location. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col relative" // Added position: relative
      style={{ background: 'linear-gradient(to bottom, rgba(255, 204, 102, 0.17), rgba(255, 204, 102, 0.68))' }}
    >
      {/* Navigation Bar */}
      <div className="h-[60px] w-full bg-[#006699] fixed z-50">
        <div className="h-full flex items-center px-6 sm:px-5 md:px-10 justify-between">
          <div className="flex items-center h-full">
            <img src={Logo} className="h-[80%]" alt="Compass Logo" loading="lazy" />
            <h1 style={{ fontFamily: 'Brans' }} className="text-3xl ml-2 text-white">
              Compass
            </h1>
          </div>
          <div className="font-md flex w-[40%] h-full justify-between items-center font-brans text-white text-xl">
            <h1>Trip Planner</h1>
            <h1>Destinations</h1>
            <h1>Travel Logs</h1>
            <img className="h-[70%]" src={Profile} alt="Profile Icon" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full min-h-full pt-[100px] flex flex-col items-center justify-start">
        {/* Header */}
        <div className="w-[80vw] font-outfit">
          <h1 className="text-3xl font-bold text-[#006699]">Adventure Planner</h1>
          <p>
            A complete tool for planning your adventure, ensuring you are fully prepared and
            informed before, during, and after your travel.
          </p>
        </div>

        {/* Map and Steps Container */}
        <div className="flex items-center flex-col gap-[40px] w-[80vw]">
          {/* Map Display */}
          <div className="w-full h-[500px] mt-[40px] rounded-md overflow-hidden">
            <MapSelector position={position} setPosition={setPosition} />
          </div>

          {/* Steps Section */}
          <div className="flex flex-row w-[80vw]">
            {/* Steps Icon */}
            <div className="min-w-[75px]">
              <img src={Steps} alt="Steps Icon" loading="lazy" />
            </div>

            {/* Steps Content */}
            <div className="w-[80vw] min-h-screen">
              {/* Step 1: Destination Input */}
              <div className="h-[275px] px-10 pt-1">
                <div className="flex flex-col">
                  <h1 className="font-bold text-2xl">Destination</h1>
                  <p>Please select a region from the map above, or enter the region name in the input field.</p>
                </div>
                <div className="flex flex-row mt-3 justify-between">
                  <div className="w-[48%] flex flex-col gap-2">
                    <h2 className="text-[15px]">City or Closest Major City</h2>
                    <input
                      className="w-full border border-gray-300 rounded-md p-2"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Manila"
                    />
                    <button
                      className="w-fit px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#6B2E0F] mt-3 flex flex-row items-center justify-center gap-2"
                      onClick={handleSearchAndPin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-t-transparent border-[#FFCC66] rounded-full animate-spin"></span>
                          Searching
                        </>
                      ) : (
                        <>
                          {isLoading && (
                            <span className="inline-block w-4 h-4 border-2 border-t-transparent border-[#FFCC66] rounded-full animate-spin"></span>
                          )}
                          Search and Pin
                        </>
                      )}
                    </button>
                  </div>
                  <div className="w-[48%] flex flex-col gap-2">
                    <h2 className="text-[15px]">Country or Region</h2>
                    <input
                      className="w-full border border-gray-300 rounded-md p-2"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g., Philippines"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>

              {/* Step 2: Activity Selection */}
              <div className="h-[336px] px-10 pt-1">
                <div className="flex flex-col">
                  <h1 className="font-bold text-2xl">Activity</h1>
                  <p>Please check all the activities you plan to do at this location.</p>
                </div>
                <div className="flex flex-row mt-3 justify-between">
                  <div className="w-[32%] flex flex-col gap-2">
                    <h3 className="text-[15px]">Land Activities</h3>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Hiking
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Mountain Biking
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Camping
                    </label>
                  </div>
                  <div className="w-[32%] flex flex-col gap-2">
                    <h3 className="text-[15px]">Water Activities</h3>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Kayaking
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Fishing
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Surfing
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Canoeing
                    </label>
                  </div>
                  <div className="w-[32%] flex flex-col gap-2">
                    <h3 className="text-[15px]">Winter Activities</h3>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Skiing
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Snowboarding
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 3: Information Selection */}
              <div className="h-[281px] px-10 pt-1">
                <div className="flex flex-col">
                  <h1 className="font-bold text-2xl">Information</h1>
                  <p>Please specify the type of information you are seeking about this trip.</p>
                </div>
                <div className="flex flex-row mt-3 justify-between">
                  <div className="w-[32%] flex flex-col gap-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Transportation
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Health & Safety
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Weather Information
                    </label>
                  </div>
                  <div className="w-[32%] flex flex-col gap-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Gear & Packing Recommendations
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Political/Cultural Information
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Activity-Specific Information
                    </label>
                  </div>
                  <div className="w-[32%] flex flex-col gap-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Accommodation Recommendations
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Food & Dining
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Shopping & Souvenirs
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 4: Submit Button */}
              <div className="h-[100px] px-10 flex items-center mb-[100px]">
                <div className="flex flex-col w-full">
                  <h1 className="font-bold text-2xl">Submit</h1>
                  <button
                    className="w-fit px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#6B2E0F] mt-3"
                    onClick={() => alert('Trip submitted!')} // Placeholder action
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full relative"> {/* Added position: relative */}
          <img
            src={BGCompass}
            alt="Background Compass"
            className="absolute bottom-0 right-0 w-[500px] h-auto z-[-1] " // Adjusted size, z-index, and opacity
          />
          <div className="h-[40px] w-full bg-[#006699] font-outfit font-bold flex items-center justify-end px-[50px] text-white">
            © 2025 ITP222L Group 9 All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;