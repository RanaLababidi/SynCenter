import React from "react";

export default function NotificationItemComponent({ notification }) {
  
  return (
    <li className="mb-1 p-2 border-b border-gray-200">
      {notification.id} {/* Adjust this based on the notification structure */}
    </li>
  );
}
