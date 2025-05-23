import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import MapSelector from './MapSelector.jsx';
import Logo from './assets/Logo.png';
import Profile from './assets/Profile.png';
import Steps from './assets/TripPlannerImg/Steps.png';
import BGCompass from './assets/TripPlannerImg/BGCompass.png';
import { Link } from 'react-router-dom';

function TripPlanner() {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [infoTypes, setInfoTypes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = Cookies.get('userEmail');
    setIsLoggedIn(!!email);
  }, []);

  const handleSearchAndPin = async () => {
    if (!city || !country) {
      setError('Please enter both city and country.');
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${city}, ${country}`)}&format=json&limit=1`,
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivityChange = (activity) => {
    setActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  const handleInfoTypeChange = (info) => {
    setInfoTypes((prev) =>
      prev.includes(info)
        ? prev.filter((item) => item !== info)
        : [...prev, info]
    );
  };

  const handleSubmit = async () => {
    if (!city || !country) {
      alert('City and country are required.');
      return;
    }

    if (!isLoggedIn) {
      alert('Please log in to save your trip.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost/my-app-api/TripPlanner.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ city, country, activities, info_types: infoTypes }),
      });

      const result = await response.json();
      alert(result.success ? 'Trip saved successfully!' : result.error || 'Failed to save trip.');
    } catch (err) {
      alert('Failed to save trip: Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-[rgba(255,204,102,0.17)] to-[rgba(255,204,102,0.68)]">
      <nav className="h-14 w-full bg-[#006699] fixed z-50 flex items-center px-6 justify-between">
        <div className="flex items-center h-full">
          <img src={Logo} className="h-4/5" alt="Compass Logo" loading="lazy" />
          <h1 className="text-3xl ml-2 text-white font-brans">Compass</h1>
        </div>
        <div className="flex w-2/5 h-full justify-between items-center text-white text-xl font-brans">
          <Link to="/trip-planner">Trip Planner</Link>
          <h1>Destinations</h1>
          <Link to="/travel-logs">Travel Logs</Link>
          {!isLoggedIn && <a href="/login" className="text-white">Login</a>}
          <img className="h-4/5" src={Profile} alt="Profile Icon" loading="lazy" />
        </div>
      </nav>

      <div className="w-full min-h-full pt-24 flex flex-col items-center">
        <div className="w-4/5 font-outfit">
          <h1 className="text-3xl font-bold text-[#006699]">Adventure Planner</h1>
          <p>A tool to plan your adventure, ensuring you're prepared and informed.</p>
        </div>

        <div className="flex flex-col gap-10 w-4/5">
          <div className="w-full h-[500px] mt-10 rounded-md overflow-hidden">
            <MapSelector position={position} setPosition={setPosition} />
          </div>

          <div className="flex flex-row w-full">
            <div className="min-w-[75px]">
              <img src={Steps} alt="Steps Icon" loading="lazy" />
            </div>

            <div className="w-full min-h-screen">
              <div className="h-[275px] px-10 pt-1">
                <h1 className="font-bold text-2xl">Destination</h1>
                <p>Select a region from the map or enter the region name below.</p>
                <div className="flex flex-row mt-3 justify-between">
                  <div className="w-[48%] flex flex-col gap-2">
                    <h2 className="text-sm">City or Closest Major City</h2>
                    <input
                      className="w-full border border-gray-300 rounded-md p-2"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Manila"
                    />
                    <button
                      className="w-fit px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#6B2E0F] mt-3 flex items-center gap-2"
                      onClick={handleSearchAndPin}
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <span className="w-4 h-4 border-2 border-t-transparent border-[#FFCC66] rounded-full animate-spin" />
                      )}
                      {isLoading ? 'Searching' : 'Search and Pin'}
                    </button>
                  </div>
                  <div className="w-[48%] flex flex-col gap-2">
                    <h2 className="text-sm">Country or Region</h2>
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

              <div className="h-[336px] px-10 pt-1">
                <h1 className="font-bold text-2xl">Activity</h1>
                <p>Check the activities you plan to do at this location.</p>
                <div className="flex flex-row mt-3 justify-between">
                  <div className="w-1/3 flex flex-col gap-2">
                    <h3 className="text-sm">Land Activities</h3>
                    {['Hiking', 'Mountain Biking', 'Camping'].map((activity) => (
                      <label key={activity} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={activities.includes(activity)}
                          onChange={() => handleActivityChange(activity)}
                        />
                        {activity}
                      </label>
                    ))}
                  </div>
                  <div className="w-1/3 flex flex-col gap-2">
                    <h3 className="text-sm">Water Activities</h3>
                    {['Kayaking', 'Fishing', 'Surfing', 'Canoeing'].map((activity) => (
                      <label key={activity} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={activities.includes(activity)}
                          onChange={() => handleActivityChange(activity)}
                        />
                        {activity}
                      </label>
                    ))}
                  </div>
                  <div className="w-1/3 flex flex-col gap-2">
                    <h3 className="text-sm">Winter Activities</h3>
                    {['Skiing', 'Snowboarding'].map((activity) => (
                      <label key={activity} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={activities.includes(activity)}
                          onChange={() => handleActivityChange(activity)}
                        />
                        {activity}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-[281px] px-10 pt-1">
                <h1 className="font-bold text-2xl">Information</h1>
                <p>Specify the type of information you need for this trip.</p>
                <div className="flex flex-row mt-3 justify-between">
                  {[
                    ['Transportation', 'Health & Safety', 'Weather Information'],
                    ['Gear & Packing Recommendations', 'Political/Cultural Information', 'Activity-Specific Information'],
                    ['Accommodation Recommendations', 'Food & Dining', 'Shopping & Souvenirs'],
                  ].map((group, index) => (
                    <div key={index} className="w-1/3 flex flex-col gap-2">
                      {group.map((info) => (
                        <label key={info} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={infoTypes.includes(info)}
                            onChange={() => handleInfoTypeChange(info)}
                          />
                          {info}
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-24 px-10 flex items-center mb-24">
                <div className="flex flex-col w-full">
                  <h1 className="font-bold text-2xl">Submit</h1>
                  <button
                    className="w-fit px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#6B2E0F] mt-3"
                    onClick={handleSubmit}
                    disabled={isLoading || !isLoggedIn}
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative">
          <img
            src={BGCompass}
            alt="Background Compass"
            className="absolute bottom-0 right-0 w-[500px] h-auto z-[-1]"
            loading="lazy"
          />
          <div className="h-10 w-full bg-[#006699] font-outfit font-bold flex items-center justify-end px-12 text-white">
            © 2025 ITP222L Group 9 All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;