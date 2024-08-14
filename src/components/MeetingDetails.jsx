import React, { useState } from "react";
import TaskInfo from "./TaskInfo";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import AutorenewSharpIcon from "@mui/icons-material/AutorenewSharp";
import ThreePOutlinedIcon from "@mui/icons-material/ThreePOutlined";
import ForwardToInboxSharpIcon from "@mui/icons-material/ForwardToInboxSharp";
import { deleteMeeting, acceptMeeting } from "../http";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CardButton from "../components/CardButton";
import deleteGif from "../assets/delete.gif";
import Success from "../components/Success";
import { red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CloseIcon from "@mui/icons-material/Close";

export default function MeetingDetails({ meeting }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const extractTime = (datetime) => {
    return datetime.split(" ")[1];
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMeeting(id);
      setShowConfirm(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };
  const handleAccept = async (id) => {
    const state = 1;
    try {
      const response = await acceptMeeting(id, state);
      setShowConfirm(false);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting meeting:", error);
    }
  };
  const handleReject = async (id) => {
    const state = 2;
    try {
      const response = await acceptMeeting(id, state);
      setShowConfirm(false);
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting meeting:", error);
    }
  };

  const getStatusIcon = (statusName) => {
    switch (statusName.toLowerCase()) {
      case "pending":
        return AutorenewSharpIcon;
      case "accepted":
        return CheckIcon;
      default:
        return null;
    }
  };

  const getStatusStyle = (statusName) => {
    if (statusName.toLowerCase() === "accepted") {
      return { color: "#93C572" }; // Pistachio color
    } else if (statusName.toLowerCase() === "pending") {
      return { color: "#f7adb4" }; // Dark color
    } else if (statusName === "REJECTED") {
      return { color: "#ff0000" }; // Red color
    } else {
      return {};
    }
  };

  const canDelete =
    meeting.requester_type === "Company" &&
    meeting.status_name.toLowerCase() === "pending";

  const canAccept =
    meeting.requester_type === "User" &&
    meeting.status_name.toLowerCase() === "pending";

  // Check if the meeting date has passed
  const meetingDate = new Date(meeting.start_date.split(" ")[0]);
  const today = new Date();
  const isMeetingDatePassed = meetingDate < today;

  return (
    <div
      key={meeting.id}
      className="border p-5 mb-2 rounded-xl font-content space-y-2"
    >
      <div className="flex">
        <strong>{meeting.title}</strong>
        {canDelete && (
          <button
            onClick={() => {
              setShowConfirm(true);
            }}
            className="ml-auto"
          >
            <DeleteOutlineSharpIcon sx={{ color: red[500] }} fontSize="large" />
          </button>
        )}
      </div>
      <div className="flex">
        <TaskInfo Icon={AccessTimeIcon} title="Start date:" />
        <p className="font-number">{extractTime(meeting.start_date)}</p>
      </div>
      <div className="flex ">
        <TaskInfo Icon={getStatusIcon(meeting.status_name)} title="Status:" />
        <p style={getStatusStyle(meeting.status_name)}>{meeting.status_name}</p>
      </div>
      <TaskInfo
        Icon={ThreePOutlinedIcon}
        title="With:"
        content={meeting.client.name}
      />
      <TaskInfo
        Icon={ForwardToInboxSharpIcon}
        title="Email :"
        content={meeting.client.email}
      />
      {isMeetingDatePassed ? (
        <p>The meeting date has passed. <SentimentVeryDissatisfiedIcon/></p>
      ) : (
        canAccept && (
          <div className="flex justify-center space-x-40 content-center">
            <CardButton
              onClick={() => handleReject(meeting.id)}
              label={"Reject"}
              Icon={CloseIcon}
              color={"red"}
            />
            <CardButton
              onClick={() => handleAccept(meeting.id)}
              label={"Accept"}
              color={"pistach"}
            />
          </div>
        )
      )}
      {showConfirm && (
        <Success
          text={"Are you sure you want to delete this meeting?"}
          onClose={handleCancelDelete}
          Icon={CloseSharpIcon}
          gif={deleteGif}
        >
          <CardButton
            label={"Delete"}
            onClick={() => handleDelete(meeting.id)} // Use meeting.id instead of employee.id
            Icon={DeleteOutlineSharpIcon}
            color={"redcolor"}
          />
        </Success>
      )}
    </div>
  );
}
