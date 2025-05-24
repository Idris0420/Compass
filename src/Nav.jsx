    import { Link } from "react-router-dom";
    import { useState, useEffect } from 'react';
    import Cookies from "js-cookie"; // Import js-cookie
    import Logo from "./assets/logo.png";
    import Profile from "./assets/Profile.png"; // Local fallback image

    function Nav() {
        const [profileImage, setProfileImage] = useState(null);

        useEffect(() => {
            const fetchProfileImage = async () => {
                // Get userEmail cookie using js-cookie
                const userEmail = Cookies.get("userEmail");

                if (!userEmail) {
                    console.error('No userEmail cookie found. Please log in.');
                    return;
                }

                try {
                    const response = await fetch('http://localhost/my-app-api/GetUserProfile.php', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-User-Email': userEmail // Send cookie value in header
                        },
                    });

                    const result = await response.json();
                    if (result.success && result.profile_image) {
                        setProfileImage(result.profile_image);
                    } else {
                        console.error('Failed to fetch profile image:', result.error);
                    }
                } catch (err) {
                    console.error('Failed to fetch profile image:', err);
                }
            };

            fetchProfileImage();
        }, []);

        return (
            <div className="h-[60px] w-full bg-[#006699] fixed">
                <div className="h-full flex items-center px-6 sm:px-5 md:px-10 justify-between">
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

                        <Link to="/travel-logs" className="cursor-pointer hover:scale-125 transition-transform duration-300">
                            Travel Logs
                        </Link>

                        <Link to="/profile" className="h-full flex items-center w-auto">
                            <img
                                className="h-12 w-12 rounded-full object-cover cursor-pointer hover:scale-150 transition-transform duration-300" // Removed border
                                src={profileImage || Profile} // Use local Profile.png as fallback
                                alt="Profile"
                            />
                        </Link>
                    </div>
                </div>                           
            </div>
        );
    }

    export default Nav;