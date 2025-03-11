import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdExpandMore, MdChevronRight } from "react-icons/md"; // Dropdown icons
import { useNavigate } from "react-router-dom";
import { CiViewList } from "react-icons/ci";

const Sidebar = ({ sidebarToggle, onSelectPage }) => {
  const navigate = useNavigate();
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false); // Dropdown state

  const sidebarItems = [
   ,
    { label: 'Add Property', icon: <BsBuildings className="w-6 h-6" />, hasDropdown: true },
    ,
    ,
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigation = (route) => {
    navigate(route);
    onSelectPage(route);
  };

  return (
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 bg-gray-50 fixed h-full px-6 py-4 shadow-lg`}
    >
      <div className="my-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
          NobleHome
        </h1>
        <h2 className="text-xl font-semibold text-gray-600">Real-Estate</h2>
      </div>

      <hr className="border-gray-300 my-4" />

      <ul className="mt-4 space-y-4">
        {sidebarItems.map((item, index) => (
          <li key={index} className="relative">
            <div
              className="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (item.isLogout) {
                  handleLogout();
                } else if (item.hasDropdown) {
                  setPropertyDropdownOpen((prev) => !prev);
                } else {
                  handleNavigation(item.route);
                }
              }}
            >
              <div className="flex items-center space-x-4 text-gray-700">
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </div>

              {item.hasDropdown && (
                <span
                  className={`transition-transform duration-300 ${
                    propertyDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <MdExpandMore className="w-6 h-6 text-gray-600" />
                </span>
              )}
            </div>

            {item.hasDropdown && propertyDropdownOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                {/* <li
                  className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200 cursor-pointer text-gray-700 flex items-center space-x-2"
                  onClick={() => handleNavigation("/home-preview")}
                >
                  <IoHomeOutline className="w-5 h-5" />
                  <span>Add Home</span>
                </li> */}
                <li
                  className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200 cursor-pointer text-gray-700 flex items-center space-x-2"
                  onClick={() => handleNavigation("/list-homes")}
                >
                  <CiViewList className="w-5 h-5" />
                  <span>List Homes</span>
                </li>
                {/* <li
                  className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200 cursor-pointer text-gray-700 flex items-center space-x-2"
                  onClick={() => handleNavigation("/land-preview")}
                >
                  <BsBuildings className="w-5 h-5" />
                  <span>Add Land</span>
                </li> */}
                <li
                  className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200 cursor-pointer text-gray-700 flex items-center space-x-2"
                  onClick={() => handleNavigation("/list-lands")}
                >
                  <CiViewList className="w-5 h-5" />
                  <span>List Lands</span>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
