import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import Show from './assets/Eye/Show.png';
import Hide from './assets/Eye/Hide.png';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost/my-app-api/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const text = await response.text();
            console.log("Raw response:", text);
            const data = JSON.parse(text);
            console.log("Parsed response:", data);

            if (data.success) {
                // Set cookie with email upon successful login
                Cookies.set("userEmail", email, { expires: 7 }); // Expires in 7 days
                setErrorMessage("");
                navigate("/home");
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Something went wrong. Check the console for more info.");
        }
    };

    

    return (
        <div className='min-w-full min-h-screen bg-cover bg-[url("./assets/LoginBg.png")] bg-no-repeat flex justify-center md:justify-end'>
            <div className='h-screen min-w-[400px] w-[45%] pt-[2%] flex-col items-center justify-center'>
                <h1 className='font-agdasima font-black text-[70px] italic text-[#FFCC66] text-light-shadow text-center'>COMPASS</h1>
                <h1 className='font-agdasima font-medium text-white text-[40px] pt-[1%] text-light-shadow text-center'>Login</h1>
                <div className='mx-auto h-[70%] w-[80%] flex flex-col gap-[10px] mt-[2%]'>
                    <div className='flex-col justify-end'>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Email</h1>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                        />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Password</h1>
                        <div className="relative w-full">
                            <input
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                className="w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 pr-10 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg"
                            />
                            <img
                                src={showPassword ? Hide : Show}
                                alt="Toggle visibility"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        <div className="w-full flex justify-end mt-1">
                            <Link to="/forgot-pass" className="text-[#FFCC66] underline hover:text-white text-medium md:text-xl">Forgot Password</Link>
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-center font-outfit text-lg">{errorMessage}</p>
                    )}
                    <button
                        onClick={handleLogin}
                        className='font-outfit mt-[5%] bg-[#FFCC66] px-[50px] py-[10px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300 mb-[2%]'
                        disabled={errorMessage.includes("Account locked")}
                    >
                        Login
                    </button>
                    <h1 className='font-outfit text-white text-center mt-[10%] text-medium md:text-xl'>
                        Don't have an account? <Link to='/' className='text-[#FFCC66] underline hover:text-white'>Sign up</Link>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Login;