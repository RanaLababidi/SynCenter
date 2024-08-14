import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import ChecklistIcon from "@mui/icons-material/Checklist";
import OutboxSharpIcon from "@mui/icons-material/OutboxSharp";
import MoveToInboxSharpIcon from "@mui/icons-material/MoveToInboxSharp";
export default function FooterTabs() {
  const [activeTab, setActiveTab] = useState("sent");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex mt-5  flex-col min-h-screen">
      <div className="flex-grow">
        <div className="flex text-white font-title text-4xl">
          <Link to="">
            <button
              className={`tab-button text-lg font-medium py-2 px-4 ${
                activeTab === "receive"
                  ? "   border-white text-white"
                  : "  border-gray-800 bg-gray-800  text-pistach"
              }`}
              onClick={() => handleTabClick("sent")}
            >
              <OutboxSharpIcon className="mr-2" />
              Sent Meetings
            </button>
          </Link>
          <Link to="receivedMeetings">
            <button
              className={`tab-button text-lg font-medium py-2 px-4 ${
                activeTab === "sent"
                  ? " border-white text-white"
                  : " border-gray-800 bg-gray-800  text-pistach"
              }`}
              onClick={() => handleTabClick("receive")}
            >
              <MoveToInboxSharpIcon className="mr-2" />
              Received Meetings
            </button>
          </Link>
        </div>
      </div>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
