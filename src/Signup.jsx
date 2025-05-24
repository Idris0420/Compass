import React, { useState, useRef } from 'react';
import Check from './assets/Check.png';
import Cross from './assets/Cross.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Show from './assets/Eye/Show.png';
import Hide from './assets/Eye/Hide.png';

function Signup() {
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [security_question, setSecurityQuestion] = useState("");
    const [security_answer, setSecurityAnswer] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Pass params
    const [has_min_length, setHasMinLength] = useState(null);
    const [has_uppercase, setHasUppercase] = useState(null);
    const [has_lowercase, setHasLowercase] = useState(null);
    const [has_number, setHasNumber] = useState(null);
    const [has_special_char, setHasSpecialChar] = useState(null);

    // Refs for input fields to manage focus
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const securityQuestionRef = useRef(null);
    const securityAnswerRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost/my-app-api/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    password,
                    security_question,
                    security_answer,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Registration successful! Redirecting to login page...");
                navigate("/login");
            } else {
                alert(data.message); // Example: "Email already exists"
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error("Signup error:", error);
        }
    };

    const verifyPassword = (pwd) => {
        if (typeof pwd !== "string") pwd = "";
        setHasMinLength(pwd.trim().length >= 8);
        setHasUppercase(/[A-Z]/.test(pwd));
        setHasLowercase(/[a-z]/.test(pwd));
        setHasNumber(/[0-9]/.test(pwd));
        setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(pwd));
    };

    const verifyForm = async () => {
        // Check for empty fields
        if (first_name.trim() === "" || last_name.trim() === "" || email.trim() === "" || security_question.trim() === "" || security_answer.trim() === "") {
            alert("All fields are required. Please fill in all fields.");
            return;
        }

        // Check for empty password
        if (password.trim() === "") {
            alert("Please enter a valid password.");
            return;
        }

        // Check if passwords match
        if (confirm_password !== password) {
            alert("Passwords do not match.");
            return;
        }

        // Enhanced email validation for Gmail format
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            alert("Please enter a valid Gmail address (e.g., example@gmail.com).");
            return;
        }

        // Check password requirements
        if (!has_min_length || !has_uppercase || !has_lowercase || !has_number || !has_special_char) {
            alert("Please ensure your password meets all requirements.");
            return;
        }

        // If all validations pass, proceed with signup
        alert("Registration successful! Redirecting to login page...");
        handleSignup();
        navigate('/login');
    };

    // Handle Enter key to move focus to next input or validate
    const handleEnterKey = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            const currentValue = e.target.value.trim();

            // Check if the current field is empty
            if (!currentValue) {
                verifyForm(); // Trigger validation warning if empty
                return;
            }

            // Special validation for email field
            if (e.target === emailRef.current) {
                const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
                if (!gmailRegex.test(currentValue)) {
                    alert("Please enter a valid Gmail address (e.g., example@gmail.com).");
                    return; // Prevent moving to the next field
                }
            }

            // Move to next field if not empty and email is valid, or trigger full validation on last field
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            } else if (e.target === confirmPasswordRef.current) {
                verifyForm();
            }
        }
    };

    return (
        <div className='min-w-full min-h-screen bg-cover bg-[url("./assets/LoginBg.png")] bg-no-repeat flex justify-center md:justify-end'>
            <div className='min-h-screen md:w-[60%] max-w-[800px] flex flex-col items-center justify-start md:pt-[2%]'>
                <h1 className='font-agdasima font-black text-5xl md:text-[70px] italic text-[#FFCC66] text-light-shadow text-center'>COMPASS</h1>
                <h1 className='font-agdasima font-medium text-white text-4xl md:text-[40px] text-light-shadow text-center'>SIGN IN</h1>
                <div className='mx-auto w-[80%] flex flex-col gap-[10px] mt-[2%]'>
                    <div className='flex flex-row justify-between'>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>First name</h1>
                            <input
                                ref={firstNameRef}
                                type="text"
                                value={first_name}
                                onChange={e => setFirstName(e.target.value)}
                                onKeyDown={(e) => handleEnterKey(e, lastNameRef)}
                                className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                            />
                        </div>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>Last name</h1>
                            <input
                                ref={lastNameRef}
                                type="text"
                                value={last_name}
                                onChange={e => setLastName(e.target.value)}
                                onKeyDown={(e) => handleEnterKey(e, securityQuestionRef)}
                                className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                            />
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>Security Question</h1>
                            <input
                                ref={securityQuestionRef}
                                type="text"
                                value={security_question}
                                onChange={e => setSecurityQuestion(e.target.value)}
                                onKeyDown={(e) => handleEnterKey(e, securityAnswerRef)}
                                className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                            />
                        </div>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>Answer</h1>
                            <input
                                ref={securityAnswerRef}
                                type="text"
                                value={security_answer}
                                onChange={e => setSecurityAnswer(e.target.value)}
                                onKeyDown={(e) => handleEnterKey(e, emailRef)}
                                className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                            />
                        </div>
                    </div>
                    <div className='flex-col justify-end'>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Email</h1>
                        <input
                            ref={emailRef}
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={(e) => handleEnterKey(e, passwordRef)}
                            className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                        />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Password</h1>
                        <div className='relative w-full'>
                            <input
                                ref={passwordRef}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    verifyPassword(e.target.value);
                                }}
                                onKeyDown={(e) => handleEnterKey(e, confirmPasswordRef)}
                                className='w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 pr-10 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                            />
                            <img
                                src={showPassword ? Hide : Show}
                                alt='Toggle password visibility'
                                className='absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Confirm Password</h1>
                        <div className='relative w-full'>
                            <input
                                ref={confirmPasswordRef}
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirm_password}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={(e) => handleEnterKey(e, null)}
                                className='w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 pr-10 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'
                            />
                            <img
                                src={showConfirmPassword ? Hide : Show}
                                alt='Toggle confirm password visibility'
                                className='absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 cursor-pointer'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        </div>
                        <h1 className='font-outfit text-2xl text-white text-sm'>Password must contain:</h1>
                        <ul className='list-disc list-none text'>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${has_min_length === null ? 'text-white' : (has_min_length ? 'text-green-400' : 'text-red-400')}`}>
                                <img
                                    src={has_min_length === null ? null : (has_min_length ? Check : Cross)}
                                    className={`w-[20px] ${has_min_length === null ? 'invisible' : ''}`}
                                    alt=''
                                />
                                At least 8 characters
                            </li>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${has_uppercase === null ? 'text-white' : (has_uppercase ? 'text-green-400' : 'text-red-400')}`}>
                                <img
                                    src={has_uppercase === null ? null : (has_uppercase ? Check : Cross)}
                                    className={`w-[20px] ${has_uppercase === null ? 'invisible' : ''}`}
                                    alt=''
                                />
                                At least one uppercase letter
                            </li>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${has_lowercase === null ? 'text-white' : (has_lowercase ? 'text-green-400' : 'text-red-400')}`}>
                                <img
                                    src={has_lowercase === null ? null : (has_lowercase ? Check : Cross)}
                                    className={`w-[20px] ${has_lowercase === null ? 'invisible' : ''}`}
                                    alt=''
                                />
                                At least one lowercase letter
                            </li>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${has_number === null ? 'text-white' : (has_number ? 'text-green-400' : 'text-red-400')}`}>
                                <img
                                    src={has_number === null ? null : (has_number ? Check : Cross)}
                                    className={`w-[20px] ${has_number === null ? 'invisible' : ''}`}
                                    alt=''
                                />
                                At least one number
                            </li>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${has_special_char === null ? 'text-white' : (has_special_char ? 'text-green-400' : 'text-red-400')}`}>
                                <img
                                    src={has_special_char === null ? null : (has_special_char ? Check : Cross)}
                                    className={`w-[20px] ${has_special_char === null ? 'invisible' : ''}`}
                                    alt=''
                                />
                                At least one special character
                            </li>
                        </ul>
                    </div>
                    <p className='font-outfit text-lg text-white text-center'>By signing up you agree to our{" "}<a href='/terms' target='_blank' rel='noopener noreferrer' className='text-[#FFCC66] underline hover:text-white'> Terms of Service </a>{" "}and{" "} <a href='/privacy' target='_blank' rel='noopener noreferrer' className='text-[#FFCC66] underline hover:text-white'> Privacy Policy</a>.</p>
                    <button className='font-outfit bg-[#FFCC66] px-[50px] py-[10px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300' onClick={verifyForm}>Sign In</button>
                    <h1 className='font-outfit text-white text-center text-medium md:text-xl'>Already have an account? <Link to='/login' className='text-[#FFCC66] underline hover:text-white'>Log in</Link></h1>
                </div>
            </div>
        </div>
    );
}

export default Signup;  