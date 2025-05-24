import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import Cross from "./assets/Cross.png";
import Check from "./assets/Check.png";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [securityAnswerInput, setSecurityAnswerInput] = useState("");
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [securityAnswerError, setSecurityAnswerError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [has_min_length, setHasMinLength] = useState(null);
  const [has_uppercase, setHasUppercase] = useState(null);
  const [has_lowercase, setHasLowercase] = useState(null);
  const [has_number, setHasNumber] = useState(null);
  const [has_special_char, setHasSpecialChar] = useState(null);

  const navigate = useNavigate();

  const emailInputRef = useRef(null);
  const securityAnswerInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  // Email format validation (only @gmail.com)
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  // Check if email exists using get_security_question.php
  const checkEmailExists = async (email) => {
    try {
      const res = await fetch("http://localhost/my-app-api/get_security_question.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.security_question) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      setEmailError("Something went wrong. Please try again.");
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
    return () => debouncedValidateEmail.cancel();
  }, [email]);

  const verifyPassword = (pwd) => {
    if (typeof pwd !== "string") pwd = "";
    setHasUppercase(/[A-Z]/.test(pwd));
    setHasLowercase(/[a-z]/.test(pwd));
    setHasNumber(/[0-9]/.test(pwd));
    setHasSpecialChar(/[^A-Za-z0-9]/.test(pwd));
    setHasMinLength(pwd.length >= 8);
  };

  const handleCheckEmail = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid Gmail address (e.g., user@gmail.com).");
      setIsEmailValid(false);
      return;
    }
    setEmailError("");
    try {
      const res = await fetch("http://localhost/my-app-api/get_security_question.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.security_question) {
        setSecurityQuestion(data.security_question);
        setSecurityAnswer(data.security_answer);
        setStep(2);
      } else {
        setEmailError(data.error || "Email not found.");
        setIsEmailValid(false);
      }
    } catch (err) {
      console.error(err);
      setEmailError("Something went wrong. Please try again.");
    }
  };

  const handleVerifyAnswer = () => {
    if (securityAnswer.toLowerCase() === securityAnswerInput.toLowerCase()) {
      setSecurityAnswerError("");
      setStep(3);
    } else {
      setSecurityAnswerError("Incorrect answer. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    verifyPassword(newPassword);

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (
      has_min_length &&
      has_uppercase &&
      has_lowercase &&
      has_number &&
      has_special_char
    ) {
      try {
        const res = await fetch("http://localhost/my-app-api/change_password.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, new_password: newPassword }),
        });

        const text = await res.text();
        console.log("Raw response:", text);

        const data = JSON.parse(text);
        console.log("Parsed response:", data);

        if (data.success) {
          alert("Changed Successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          alert(data.error || "Failed to update password.");
        }
      } catch (err) {
        console.error("Caught error:", err);
        alert("An error occurred while changing the password: " + err.message);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 1) {
        handleCheckEmail();
      } else if (step === 2) {
        handleVerifyAnswer();
      } else if (step === 3) {
        if (document.activeElement === passwordInputRef.current) {
          confirmPasswordInputRef.current?.focus();
        } else {
          handleChangePassword();
        }
      }
    }
  };

  useEffect(() => {
    if (step === 2) {
      securityAnswerInputRef.current?.focus();
    } else if (step === 3) {
      passwordInputRef.current?.focus();
    }
  }, [step]);

  // Update password checklist as the user types
  useEffect(() => {
    verifyPassword(newPassword);
  }, [newPassword]);

  return (
    <div className="min-w-full min-h-screen bg-cover bg-[url('./assets/LoginBg.png')] bg-no-repeat flex justify-center md:justify-end">
      <div className="h-screen min-w-[400px] w-[45%] pt-[2%] flex-col items-center justify-center">
        <h1 className="font-agdasima font-black text-[70px] italic text-[#FFCC66] text-light-shadow text-center">COMPASS</h1>
        <h1 className="font-agdasima font-medium text-white text-[40px] pt-[1%] text-light-shadow text-center">Forgot Password</h1>

        <div className="mx-auto h-[70%] w-[80%] flex flex-col gap-[10px] mt-[2%]">
          {/* Email Input */}
          <div>
            <h1 className="font-agdasima text-2xl text-white font-medium">Email</h1>
            <div className="flex">
              <input
                ref={emailInputRef}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                type="email"
                className="w-[70%] h-[40px] bg-white border border-gray-500 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg"
              />
              <button
                onClick={handleCheckEmail}
                className="font-outfit bg-[#FFCC66] px-[20px] h-[40px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300 mb-[2%]"
                disabled={!isEmailValid}
              >
                Confirm
              </button>
            </div>
            {emailError && (
              <p className="text-red-500 font-outfit text-base mt-0 text-left">{emailError}</p>
            )}
          </div>

          {/* Security Question */}
          <div>
            <h1 className={`font-agdasima text-2xl text-white font-medium ${step === 1 ? "invisible" : "block"}`}>
              {securityQuestion}
            </h1>
            <div className="flex">
              <input
                ref={securityAnswerInputRef}
                onChange={(e) => setSecurityAnswerInput(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                className={`w-[70%] h-[40px] bg-white border border-gray-500 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg ${step <= 1 ? "invisible" : "block"}`}
              />
              <button
                onClick={handleVerifyAnswer}
                className={`font-outfit bg-[#FFCC66] px-[20px] h-[40px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300 mb-[2%] ${step <= 1 ? "invisible" : "block"}`}
              >
                Confirm
              </button>
            </div>
            {securityAnswerError && (
              <p className="text-red-500 font-outfit text-base mt-0 text-left">{securityAnswerError}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <h1 className={`font-agdasima text-2xl text-white font-medium ${step <= 2 ? "invisible" : "block"}`}>Password</h1>
            <input
              ref={passwordInputRef}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              type="password"
              className={`w-full h-[40px] bg-white border border-gray-500 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg ${step <= 2 ? "invisible" : "block"}`}
            />
          </div>
          <div>
            <h1 className={`font-agdasima text-2xl text-white font-medium ${step <= 2 ? "invisible" : "block"}`}>Confirm Password</h1>
            <input
              ref={confirmPasswordInputRef}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              type="password"
              className={`w-full h-[40px] bg-white border border-gray-500 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg ${step <= 2 ? "invisible" : "block"}`}
            />
            <ul className={`list-none text-sm space-y-1 ${step <= 2 ? "invisible" : "block"}`}>
              <li className={`font-outfit flex items-center gap-2 ${has_uppercase !== null ? (has_uppercase ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_uppercase ? Check : Cross} className={`w-[20px] ${has_uppercase === null ? "invisible" : ""}`} alt="" />
                At least one uppercase letter
              </li>
              <li className={`font-outfit flex items-center gap-2 ${has_lowercase !== null ? (has_lowercase ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_lowercase ? Check : Cross} className={`w-[20px] ${has_lowercase === null ? "invisible" : ""}`} alt="" />
                At least one lowercase letter
              </li>
              <li className={`font-outfit flex items-center gap-2 ${has_number !== null ? (has_number ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_number ? Check : Cross} className={`w-[20px] ${has_number === null ? "invisible" : ""}`} alt="" />
                At least one number
              </li>
              <li className={`font-outfit flex items-center gap-2 ${has_special_char !== null ? (has_special_char ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_special_char ? Check : Cross} className={`w-[20px] ${has_special_char === null ? "invisible" : ""}`} alt="" />
                At least one special character
              </li>
              <li className={`font-outfit flex items-center gap-2 ${has_min_length !== null ? (has_min_length ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_min_length ? Check : Cross} className={`w-[20px] ${has_min_length === null ? "invisible" : ""}`} alt="" />
                At least 8 characters
              </li>
            </ul>
          </div>

          <button
            onClick={handleChangePassword}
            className={`font-outfit mt-[5%] bg-[#FFCC66] px-[40px] py-[10px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300 mb-[2%] ${step <= 2 ? "invisible" : "block"}`}
          >
            Change Password
          </button>

          <h1 className="font-outfit text-white text-center mt-[10%] text-medium md:text-xl">
            Don't have an account?{" "}
            <Link to="/" className="text-[#FFCC66] underline hover:text-white">
              Sign up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;