// Dashboard.js
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import MainContent from "../Components/MainContent";
import Sidebar from "../Components/Sidebar"; // Ensure Sidebar is properly imported

const Dashboard = ({ sidebarToggle, setSidebarToggle }) => {
  // State to track the currently selected page
  const [selectedPage, setSelectedPage] = useState("Overview"); // Default page

  return (
    <div className="flex w-full">
      {/* Sidebar Component */}
      <Sidebar
        sidebarToggle={sidebarToggle}
        onSelectPage={setSelectedPage} // Pass the setSelectedPage function to Sidebar
      />

      {/* Main Content Area */}
      <div className={`${sidebarToggle ? "" : "ml-64"} flex-1`}>
        <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <MainContent selectedPage={selectedPage} />
      </div>
    </div>
  );
};

export default Dashboard;
