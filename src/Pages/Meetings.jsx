import React, { useState } from "react";
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";
import ButtonComponent from "../components/ButtonComponent";
import FormModelRequired from "../components/FormModelRequired";
import Menu from "../components/Menu";
import { AddMeeting } from "../http";
import CalendarComponent from "../components/CalendarComponent";
import Model from "../Pages/Model";

export default function Meeting() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
  const [time, setTime] = useState(""); // HH:MM
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const combineDateTime = () => {
    // Combine startDate and time into a single datetime string
    if (startDate && time) {
      return `${startDate} ${time}:00`; // Append seconds to time
    }
    return ""; // Return an empty string if either is missing
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("start_date", combineDateTime()); // Use combined datetime
    formData.append("client_id", selectedClientId);

    try {
      const response = await AddMeeting(formData); // Corrected function name
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding meeting:", error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="ml-auto -mt-10">
        </div>
      </div>
       <div className="mt-9 h-fit"><CalendarComponent/></div>
      {showModal && (
        <Model
          title="Scheduling new meeting"
          onClose={handleClose}
          onSave={handleSave}
          labelButton={"Schedule"}
        >
          <FormModelRequired
            label="Title :"
            id="title"
            type="text"
            placeholder="Enter a title for your meeting"
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormModelRequired
            label="Date :"
            id="date"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <FormModelRequired
            label="Time :"
            id="time"
            type="time"
            onChange={(e) => setTime(e.target.value)}
          />
          <Menu onClientSelect={setSelectedClientId} />
        </Model>
      )}
    </div>
  );
}
