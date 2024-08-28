import React, { useState } from "react";
import { Form, useRouteLoaderData } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import FormModelRequired from "../components/FormModelRequired";
import Menu from "../components/Menu";
import { AddMeeting } from "../http";
import CalendarComponent from "../components/CalendarComponent";
import Model from "../Pages/Model";
import meet from "../assets/meet.png";

export default function ReceivedMeetings() {
  const data = useRouteLoaderData("meeting");

  const companyEvents = data  
  console.log("Company Events:", companyEvents); // Debugging
  console.log("data:", companyEvents); // Debugging

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
    if (startDate && time) {
      return `${startDate} ${time}:00`;
    }
    return "";
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("start_date", combineDateTime());
    formData.append("client_id", selectedClientId);

    try {
      const response = await AddMeeting(formData);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding meeting:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="ml-auto"></div>
      </div>
      <div className="mt-9 h-fit">
        <div className="flex">
          <CalendarComponent events={companyEvents} />
          <div className="ml-auto">
            <button
              className="flex w-full justify-center text-center rounded-s-full bg-pistach px-12 py-4 font-content leading-6 text-background transition duration-500 ease-in-out transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleOpen}
            >
              <div>
                Schedule new meeting
                <img src={meet} className="ml-16" alt="Schedule meeting" />
              </div>
            </button>
          </div>
        </div>
      </div>
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
