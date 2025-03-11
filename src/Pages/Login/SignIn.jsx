import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import coverImg from "../../assets/signInBg.jpeg";
import { LuUser } from "react-icons/lu";
import { IoKeyOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex items-start">
      {/* Right side with Login Form */}
      <div className="w-1/2 h-full bg-[#F5F5F5] flex flex-col p-20 justify-center items-center">
        <div className="mb-6 text-center">
          <h1 className="text-[15px] font-bold uppercase font-moul">Homescape</h1>
          <span className="tracking-widest text-[15px] font-bold uppercase font-moul">H a v e n</span>
        </div>

        <div className="w-full flex flex-col mb-4">
          <h3 className="text-3xl font-semibold mb-2 flex items-center justify-center">Sign In</h3>
          <p className="text-base mb-2 flex items-center justify-center">Welcome Back! Please enter your details.</p>
        </div>
        <form action="" onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LuUser  className="text-gray-400" />
            </span>
            <input type="text" id="username" className="w-full p-3 pl-10 border border-gray-300 rounded-lg" placeholder="Username" required />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <IoKeyOutline className="text-gray-400" />
            </span>
            <input type={showPassword ? "text" : "password"} id="password" className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg" placeholder="Password" required />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={toggleShowPassword}>
              {showPassword ? <IoEyeOutline className="text-gray-400" /> : <IoEyeOffOutline className="text-gray-400" />}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <a href="#" className="text-blue-500 hover:underline font-semibold">Forgot password?</a>
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember Me</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg">Login</button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline font-semibold">Sign Up</Link> {/* Updated to Link */}
            </p>
          </div>
        </form>
      </div>

      {/* Left side with Image */}
      <div className="relative w-1/2 h-[690px] flex flex-col m-5 ">
        <img src={coverImg} alt="Cover" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default SignIn;