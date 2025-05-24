import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from 'react';
import ProfileEdit from "./assets/ProfileEdit.png";
import DefaultProfile from "./assets/Profile.png"; // Rename the imported image to avoid conflict

function Profile() { // Keep the component name as Profile
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '', profile_image: null });
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    
    // Fetch user data and trips when component mounts
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost/my-app-api/Profile.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            if (result.success) {
                setUser(result.user);
                setTrips(result.trips);
            } else {
                setError(result.error || 'Failed to fetch data.');
            }
        } catch (err) {
            setError('Failed to fetch data: ' + err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle image click to trigger file input
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection and upload
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profile_image', file);

        try {
            const response = await fetch('http://localhost/my-app-api/Profile.php', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const result = await response.json();
            if (result.success) {
                setUser({ ...user, profile_image: result.profile_image });
                alert('Profile image updated successfully.');
            } else {
                setError(result.error || 'Failed to upload image.');
            }
        } catch (err) {
            setError('Failed to upload image: ' + err.message);
        }
    };

    // Logout function
    const handleLogout = () => {
        Cookies.remove("userEmail");
        navigate("/login");
    };

    // Clear history function
    const handleClearHistory = async () => {
        if (!window.confirm('Are you sure you want to clear your trip history? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch('http://localhost/my-app-api/Profile.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            if (result.success) {
                setTrips([]);
                alert('Trip history cleared successfully.');
            } else {
                setError(result.error || 'Failed to clear history.');
            }
        } catch (err) {
            setError('Failed to clear history: ' + err.message);
        }
    };

    return (
        <div className="w-full min-h-screen">
            <Nav />
            <div className="pt-[90px] flex flex-col px-[5%]">
                <div>
                    <h1 className="font-outfit text-5xl font-bold text-[#006699]">Profile</h1>
                </div>
                <div className="flex flex-row h-[270px] w-full gap-10 font-outfit mt-[40px]">
                    <div className="relative inline-block h-[270px] w-[270px]">
                        <img
                            className="rounded-full h-full w-full border-[5px] border-[#006699] object-cover cursor-pointer"
                            src={user.profile_image || DefaultProfile} // Use the renamed imported image
                            alt="Profile"
                            onClick={handleImageClick}
                        />
                        <img
                            className="absolute top-8 right-2 w-8 h-8 rounded-full bg-white p-1 cursor-pointer"
                            src={ProfileEdit}
                            alt="Edit Profile"
                            onClick={handleImageClick}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div>
                            <h1 className="text-[#006699] text-[32px] font-bold">Name</h1>
                            <h2 className="text-[24px]">{`${user.first_name} ${user.last_name}`}</h2>
                        </div>
                        <div>
                            <h1 className="text-[#006699] text-[32px] font-bold">Email Address</h1>
                            <h2 className="text-[24px]">{user.email}</h2>
                        </div>
                        <div>
                            <button onClick={handleLogout} className="px-3 py-1 rounded hover:scale-125 transition-transform duration-300 text-white bg-red-500">Log Out</button>
                        </div>
                    </div>
                </div>
                <div className="mt-[40px] border-b-[10px] border-[#006699] pb-[10px] flex flex-row justify-between items-center">
                    <h1 className="font-outfit text-3xl font-bold text-[#006699]">Adventure Planner History</h1>
                    <h1 className="text-[#993300] font-medium hover:underline cursor-pointer" onClick={handleClearHistory}>Clear History</h1>
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
                        <tbody>
                            {trips.map((trip, index) => (
                                <tr key={trip.id} className="text-center">
                                    <td>{index + 1}</td>
                                    <td>{new Date(trip.date).toLocaleDateString()}</td>
                                    <td>{trip.destination}</td>
                                    <td>{trip.activity}</td>
                                    <td>{trip.info_trip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {trips.length === 0 && !error && <p className="mt-2">No trips found.</p>}
                </div>
            </div>
        </div>
    );
}

export default Profile;