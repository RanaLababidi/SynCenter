import React, { useState } from "react";
import NotificationsActiveSharpIcon from "@mui/icons-material/NotificationsActiveSharp";
import NotificationItemComponent from "../components/NotificationItemComponent";
import { notificationLoader } from "../http";
export default function NotificationComponent() {
  const [showNotifications, setShowNotifications] = useState(false);
  var data ;
  const handleButtonClick = async () => {
    setShowNotifications(!showNotifications);
    try {
       response = await notificationLoader(); 
       data=responce.notifications
    } catch (error) {
      console.error("Error adding meeting:", error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <NotificationsActiveSharpIcon
          fontSize="large"
          className="w-10 h-10 ml-1 text-white transition duration-500 ease-in-out transform hover:scale-150 hover:text-white"
        />
      </button>
      {showNotifications && (
        <div className="font-content text-black bg-white shadow-lg rounded p-4 absolute top-14 right-0 w-64">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <ul>
            <NotificationItemComponent notification={data} />
          </ul>
        </div>
      )}
    </div>
  );
}
