import React from "react";
import Overview from "../Pages/dashboard/Overview";

import { LuLogOut } from "react-icons/lu";

const MainContent = ({ selectedPage }) => {
  const renderContent = () => {
    switch (selectedPage) {
      case "Overview":
        return <Overview />;
      case "Property":
        return <HouseProperty />; // Updated to use the correct component
      case "Customers":
        return <CustomerDetailsOverview/>;
      case "Log Out":
        return <LuLogOut/>; 
      default:
        return <Overview />;
    }
  };

  return <div className="p-5">{renderContent()}</div>;
};

export default MainContent;
