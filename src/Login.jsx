import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import Show from './assets/Eye/Show.png';
import Hide from './assets/Eye/Hide.png';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    // Email format validation (only @gmail.com)
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        return emailRegex.test(email);
    };

    // Check if email exists using login.php
    const checkEmailExists = async (email) => {
        try {
            const response = await fetch("http://localhost/my-app-api/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password: "" }), // Send empty password to check email only
            });

            const text = await response.text();
            console.log("Email check raw response:", text);
            const data = JSON.parse(text);
            console.log("Email check parsed response:", data);

            if (data.success) {
                // This shouldn't happen with empty password, but handle it
                return true;
            } else if (data.error === "No account with that email exists.") {
                return false;
            } else {
                // Other errors (e.g., incorrect password) mean the email exists
                return true;
            }
        } catch (error) {
            console.error("Email check error:", error);
            setErrorMessage("Failed to verify email. Please try again.");
            return false;
        }
    };

    // Debounced email validation and existence check
    const debouncedValidateEmail = debounce(async (email) => {
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid Gmail address (e.g., user@gmail.com).");
            setIsEmailValid(false);
            return;
        }
        setEmailError("");
        const exists = await checkEmailExists(email);
        if (exists) {
            setIsEmailValid(true);
        } else {
            setEmailError("No account with that email exists.");
            setIsEmailValid(false);
        }
    }, 500);

    // Trigger email validation on input change
    useEffect(() => {
        if (email) {
            debouncedValidateEmail(email);
        } else {
            setEmailError("");
            setIsEmailValid(false);
        }
        // Cleanup debounce on unmount
        return () => debouncedValidateEmail.cancel();
    }, [email]);

    // Handle Enter key for email input (optional, for submission)
    const handleEmailKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isEmailValid) {
                passwordInputRef.current.focus();
            }
        }
    };

    // Handle Enter key for password input
    const handlePasswordKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!validateEmail(email)) {
                setEmailError("Please enter a valid Gmail address (e.g., user@gmail.com).");
                setIsEmailValid(false);
                return;
            }
            if (!isEmailValid) {
                setEmailError("Please verify your email before proceeding.");
                return;
            }
            setEmailError("");
            handleLogin();
        }
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid Gmail address (e.g., user@gmail.com).");
            setIsEmailValid(false);
            return;
        }
        if (!isEmailValid) {
            setEmailError("Please verify your email before proceeding.");
            return;
        }
        setEmailError("");
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
                Cookies.set("userEmail", email, { expires: 7 });
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
            <div className='h-screen min-w-[400px] w-[45%] pt-[2%] flex flex-col items-center justify-center'>
                <h1 className='font-agdasima font-black text-[70px] italic text-[#FFCC66] text-light-shadow text-center'>COMPASS</h1>
                <h1 className='font-agdasima font-medium text-white text-[40px] pt-[1%] text-light-shadow text-center'>Login</h1>
                <div className='mx-auto h-[70%] w-[80%] flex flex-col gap-[10px] mt-[2%]'>
                    <div className='flex flex-col'>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Email</h1>
                        <input
                            ref={emailInputRef}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleEmailKeyPress}
                            type="email"
                            className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                        />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Password</h1>
                        <div className="relative w-full">
                            <input
                                ref={passwordInputRef}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handlePasswordKeyPress}
                                type={showPassword ? "text" : "password"}
                                className="w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 pr-10 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg"
                                disabled={!isEmailValid}
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
                    <div className="h-[24px] text-center">
                        {(errorMessage || emailError) && (
                            <p className="text-red-500 font-outfit text-lg">{emailError || errorMessage}</p>
                        )}
                    </div>
                    <button
                        onClick={handleLogin}
                        className='font-outfit mt-[5%] bg-[#FFCC66] px-[50px] py-[10px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300 mb-[2%]'
                        disabled={errorMessage.includes("Account locked") || !isEmailValid}
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