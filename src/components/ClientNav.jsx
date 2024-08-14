import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import ChecklistIcon from "@mui/icons-material/Checklist";

export default function FooterTabs() {
  const [activeTab, setActiveTab] = useState("info");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="flex text-white font-title text-4xl">
        <Link to="meeting">
            <button
              className={`tab-button text-lg font-medium py-2 px-10 ${
                activeTab === "tasks"
                  ? "border-t-2 border-l-2 border-r-2 border-white text-pistach"
                  : "border-t-0 border-l-2 border-r-2 border-b-2 border-gray-800 bg-gray-800 text-white"
              }`}
              onClick={() => handleTabClick("tasks")}
            >
              <ChecklistIcon className="mr-2" />
              Meetings
            </button>
          </Link>
          <Link to="">
            <button
              className={`tab-button text-lg font-medium py-2 px-4 ${
                activeTab === "info"
                  ? "border-t-2 border-l-2 border-r-2 border-white text-pistach"
                  : "border-t-0 border-l-2 border-r-2 border-b-2 border-gray-800 bg-gray-800 text-white"
              }`}
              onClick={() => handleTabClick("info")}
            >
              <EditNoteSharpIcon className="mr-2" />
              Clients Profiles
            </button>
          </Link>
          <div className="   border-t-2  border-white  "></div>
        </div>
      </div>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
