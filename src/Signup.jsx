import React, { useState } from 'react'
import Check from './assets/Check.png'
import Cross from './assets/Cross.png'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Singnup() {

    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [security_question, setSecurityQuestion] = useState("");
    const [security_answer, setSecurityAnswer] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");



    //pass params
    const [signup_clicked, setSignupClicked] = useState(false);
    const [has_min_length, setHasMinLength] = useState(null);
    const [has_uppercase, setHasUppercase] = useState(null);
    const [has_lowercase, setHasLowercase] = useState(null);
    const [has_number, setHasNumber] = useState(null);
    const [has_special_char, setHasSpecialChar] = useState(null);

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
        if (password === "") {
          alert("Please enter a valid password");
          setSignupClicked(true);
          return;
        }
      
        if (confirm_password !== password) {
          alert("Passwords do not match");
          setSignupClicked(true);
          return;
        }
      
        if (first_name === "" || last_name === "" || email === "" || security_question === "" || security_answer === "") {
          alert("Please complete all fields");
          setSignupClicked(true);
          return;
        }
        if (!email.includes("@")) {
          alert("Please enter a valid email");
          setSignupClicked(true);
          return;
        }
        if (!has_min_length || !has_uppercase || !has_lowercase || !has_number || !has_special_char) {
          alert("Please enter a valid password");
          setSignupClicked(true);
          return;
        }
        alert("Registration successful! Redirecting to login page...");
        handleSignup();
        navigate('/login');
      };

      useEffect(() => {
        if (signup_clicked) {
          verifyPassword(password);
        }
      }, [signup_clicked]); // run only when signup_clicked changes
      

    return(
        <div className='min-w-full min-h-screen bg-cover  bg-[url("./assets/LoginBg.png")] bg-no-repeat flex justify-center md:justify-end'>
            <div className='min-h-screen  md:w-[60%] max-w-[800px] flex flex-col items-center justify-start md:pt-[2%]'>
                <h1 className='font-agdasima font-black text-5xl md:text-[70px] italic text-[#FFCC66] text-light-shadow text-center '>COMPASS</h1>
                <h1 className='font-agdasima font-medium text-white text-4xl md:text-[40px] text-light-shadow text-center'>SIGN IN</h1>
                <div className='mx-auto w-[80%] flex flex-col gap-[10px] mt-[2%] '>
                    <div className='flex flex-row  justify-between'>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>First name</h1>
                            <input type="text" name="" id="" onChange={e => setFirstName(e.target.value)} className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'/>
                        </div>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>Last name</h1>
                            <input type="text" name="" id="" onChange={e => setLastName(e.target.value)} className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                        </div>
                    </div>
                    <div className='flex flex-row  justify-between'>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>Security Question</h1>
                            <input type="text" name="" id="" onChange={e => setSecurityQuestion(e.target.value)} className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'/>
                        </div>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>Answer</h1>
                            <input type="text" name="" id="" onChange={e => setSecurityAnswer(e.target.value)} className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                        </div>
                    </div>
                    <div className='flex-col justify-end '>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Email</h1>
                        <input type="text" onChange={e => setEmail(e.target.value)} className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Password</h1>
                        <input type="text" onChange={(e) => {setPassword(e.target.value); verifyPassword(e.target.value); }} className='w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Confirm Password</h1>
                        <input type="text" onChange={e => setConfirmPassword(e.target.value)} className='w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                        <h1 className="font-outfit text-2xl text-white text-sm">Password must contain:</h1>
                        <ul className='list-disc list-none text'>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${signup_clicked ? (has_min_length ? "text-green-400" : "text-red-400") : "text-white"}`}> <img src={signup_clicked ? (has_min_length ? Check : Cross) : null} className={`w-[20px] ${!signup_clicked ? 'invisible' : ''}`} alt="" />At least 8 characters</li>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${signup_clicked ? (has_uppercase ? "text-green-400" : "text-red-400") : "text-white"}`}> <img src={has_uppercase ? Check:Cross} className={`w-[20px] ${!signup_clicked ? 'invisible' : ''}`} alt="" />At least one uppercase letter</li>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${signup_clicked ? (has_lowercase ? "text-green-400" : "text-red-400") : "text-white"}`}> <img src={has_lowercase ? Check:Cross} className={`w-[20px] ${!signup_clicked ? 'invisible' : ''}`} alt="" />At least one lowercase letter</li>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${signup_clicked ? (has_number ? "text-green-400" : "text-red-400") : "text-white"}`}> <img src={has_number ? Check:Cross} className={`w-[20px] ${!signup_clicked ? 'invisible' : ''}`} alt="" />At least one number</li>
                            <li className={`font-outfit text-sm flex items-center gap-1 ${signup_clicked ? (has_special_char ? "text-green-400" : "text-red-400") : "text-white"}`}> <img src={has_special_char ? Check:Cross} className={`w-[20px] ${!signup_clicked ? 'invisible' : ''}`} alt="" />At least one special character</li>
                        </ul>
                    </div>
                    <p className="font-outfit text-lg text-white text-center">By signing up you agree to our{" "}<a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#FFCC66] underline hover:text-white" > Terms of Service </a>{" "} and{" "} <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FFCC66] underline hover:text-white"> Privacy Policy</a>.</p>
                    <button className='font-outfit bg-[#FFCC66] px-[50px] py-[10px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300' onClick={verifyForm}>Sign In</button>
                
                    <h1 className='font-outfit text-white text-center text-medium md:text-xl'>Already have an account? <Link to="/login" className='text-[#FFCC66] underline hover:text-white'>Log in</Link></h1>
                </div>
            </div>
        </div>
    )
}

export default Singnup;