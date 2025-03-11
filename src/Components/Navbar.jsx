import React, { useState } from "react";
import { FaBars, FaBell, FaSearch, FaUser } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import profile from "../assets/profile.png";
import { IoIosArrowDown } from "react-icons/io";
import {useNavigate} from "react-router-dom";

const Navbar = ({sidebarToggle, setSidebarToggle}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/admin");
  };

  return (
    <div className="px-4  py-3 flex justify-between items-center ">
      <div className="flex items-center text-xl">
        <FaBars className="mr-4 cursor-pointer" onClick={() => setSidebarToggle(!sidebarToggle)}/>

        <button className="p-1 focus:outline-none flex items-center ">
          <div className="relative flex items-center ">
            
           
          </div>
        </button>
      </div>

      <div className="flex items-center gap-x-5">
        <FiBell className="w-6 h-6" />

        <div className="relative">
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={toggleDropdown}
          >
            <img
              src={profile}
              alt="User"
              className="w-8 h-8 rounded-full object-cover "
            />
            <span className="text-sm font-medium">Thilak Gallage</span>
            <IoIosArrowDown className="cursor-pointer" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <ul className="py-1 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleProfileClick}>
                  <a href="#">Profile</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <a href="#">Setting</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Navbar;
