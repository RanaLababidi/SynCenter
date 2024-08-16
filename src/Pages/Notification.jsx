import React, { useState } from "react";
import NotificationItemComponent from "../components/NotificationItemComponent";
import BadgeComponent from "../components/BadgeComponent ";
import { notificationLoader } from "../http";

export default function NotificationComponent() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [data, setData] = useState([]);

  const handleButtonClick = async () => {
    setShowNotifications(!showNotifications);
    try {
      const response = await notificationLoader();
      setData(response);
      console.log(response);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const clearNotifications = () => {
    setData([]);
  };

  return (
    <div>
      <BadgeComponent onClick={handleButtonClick} />
      {showNotifications && (
        <div className="font-content rounded-3xl text-background bg-white shadow-lg p-2 absolute top-14 right-0 w-80 mr-5">
          <div>
            <h3 className="text-lg p-2 text-background border-b font-semibold mb-2">
              Notifications
            </h3>
          </div>
          <button
            onClick={clearNotifications}
            className="text-sm text-gray hover:underline ml-60"
          >
            Clear All
          </button>
          <NotificationItemComponent notifications={data} />
        </div>
      )}
    </div>
  );
}
