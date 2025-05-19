import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cross from "./assets/Cross.png";
import Check from "./assets/Check.png";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState(""); // expected answer from DB
  const [securityAnswerInput, setSecurityAnswerInput] = useState(""); // user's input
  const [step, setStep] = useState(1);

  const [reset_clicked, setResetClicked] = useState(false);
  const [has_min_length, setHasMinLength] = useState(null);
  const [has_uppercase, setHasUppercase] = useState(null);
  const [has_lowercase, setHasLowercase] = useState(null);
  const [has_number, setHasNumber] = useState(null);
  const [has_special_char, setHasSpecialChar] = useState(null);

  const verifyPassword = (pwd) => {
    if (typeof pwd !== "string") pwd = "";
    setHasUppercase(/[A-Z]/.test(pwd));
    setHasLowercase(/[a-z]/.test(pwd));
    setHasNumber(/[0-9]/.test(pwd));
    setHasSpecialChar(/[^A-Za-z0-9]/.test(pwd));
    setHasMinLength(pwd.length >= 8);
  };

  const handleCheckEmail = async () => {
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
        alert(data.error || "Email not found.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleVerifyAnswer = () => {
    if (securityAnswer.toLowerCase() === securityAnswerInput.toLowerCase()) {
      setStep(3);
    } else {
      alert("Incorrect answer. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    setResetClicked(true);
    verifyPassword(newPassword);
  
    // Delay to let error state update
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    if (
      has_min_length &&
      has_uppercase &&
      has_lowercase &&
      has_number &&
      has_special_char
    ) {
      try {
        const res = await fetch("http://localhost/my-app-api/check_old_password.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, new_password: newPassword }),
        });
      
        const text = await res.text(); // get raw response
        console.log("Raw response:", text);
      
        const data = JSON.parse(text); // try parsing it to JSON
        console.log("Parsed response:", data);
      
        // ... handle success logic here
      } catch (err) {
        console.error("Caught error:", err);
        alert("An error occurred while changing the password.");
      }
      
    }
  };
  

  useEffect(() => {
    if (reset_clicked) {
      verifyPassword(newPassword);
    }
  }, [reset_clicked, newPassword]);

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
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-[70%] h-[40px] bg-white border border-gray-500 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg"
              />
              <button
                onClick={handleCheckEmail}
                className="font-outfit bg-[#FFCC66] px-[20px] h-[40px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300 mb-[2%]"
              >
                Confirm
              </button>
            </div>
          </div>

          {/* Security Question */}
          <div>
            <h1 className={`font-agdasima text-2xl text-white font-medium ${step === 1 ? "invisible" : "block"}`}>
              {securityQuestion}
            </h1>
            <div className="flex">
              <input
                onChange={(e) => setSecurityAnswerInput(e.target.value)}
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
          </div>

          {/* New Password */}
          <div>
            <h1 className={`font-agdasima text-2xl text-white font-medium ${step <= 2 ? "invisible" : "block"}`}>Password</h1>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className={`w-full h-[40px] bg-white border border-gray-500 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg ${step <= 2 ? "invisible" : "block"}`}
            />
          </div>
          <div>
            <h1 className={`font-agdasima text-2xl text-white font-medium ${step <= 2 ? "invisible" : "block"}`}>Confirm Password</h1>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className={`w-full h-[40px] bg-white border border-gray-500 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg ${step <= 2 ? "invisible" : "block"}`}
            />
            <ul className={`list-none text-sm space-y-1 ${step <= 2 ? "invisible" : "block"}`}>
              <li className={`font-outfit flex items-center gap-2 ${reset_clicked ? (has_uppercase ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_uppercase ? Check : Cross} className={`w-[20px] ${!reset_clicked ? "invisible" : ""}`} alt="" />
                At least one uppercase letter
              </li>
              <li className={`font-outfit flex items-center gap-2 ${reset_clicked ? (has_lowercase ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_lowercase ? Check : Cross} className={`w-[20px] ${!reset_clicked ? "invisible" : ""}`} alt="" />
                At least one lowercase letter
              </li>
              <li className={`font-outfit flex items-center gap-2 ${reset_clicked ? (has_number ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_number ? Check : Cross} className={`w-[20px] ${!reset_clicked ? "invisible" : ""}`} alt="" />
                At least one number
              </li>
              <li className={`font-outfit flex items-center gap-2 ${reset_clicked ? (has_special_char ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_special_char ? Check : Cross} className={`w-[20px] ${!reset_clicked ? "invisible" : ""}`} alt="" />
                At least one special character
              </li>
              <li className={`font-outfit flex items-center gap-2 ${reset_clicked ? (has_min_length ? "text-green-400" : "text-red-400") : "text-white"}`}>
                <img src={has_min_length ? Check : Cross} className={`w-[20px] ${!reset_clicked ? "invisible" : ""}`} alt="" />
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
