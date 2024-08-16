// BadgeComponent.jsx
import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import NotificationsActiveSharpIcon from "@mui/icons-material/NotificationsActiveSharp";
import { unread } from "../http";

const BadgeComponent = ({ onClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const count = await unread();
      setUnreadCount(count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const handleClick = () => {
    onClick();
    fetchUnreadCount(); // Fetch unread count when the icon is clicked
  };

  return (
    <Badge badgeContent={unreadCount} color="secondary">
      <NotificationsActiveSharpIcon
        fontSize="large"
        className="w-10 h-10 ml-1 text-white transition duration-500 ease-in-out transform hover:scale-150 hover:text-white"
        onClick={handleClick}
      />
    </Badge>
  );
};

export default BadgeComponent;
