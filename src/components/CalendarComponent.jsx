import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import MeetingDetails from "./MeetingDetails";
import meeting from "../assets/meeting.png";
export default function CalendarComponent({ events }) {
  const [date, setDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Extract unique dates from the events
  const highlightDates = events.map((event) => {
    const eventDate = new Date(event.start_date.split(" ")[0]);
    return eventDate;
  });

  const tileClassName = ({ date: tileDate, view }) => {
    if (view === "month") {
      const isWeekend = tileDate.getDay() === 6 || tileDate.getDay() === 5;
      const isHighlighted = highlightDates.some(
        (highlightDate) =>
          tileDate.toDateString() === highlightDate.toDateString()
      );
      const isSelected = tileDate.toDateString() === date.toDateString();
      let classes = "all ";
      if (isSelected) classes += "selected-date ";
      if (isHighlighted) classes += "highlight-date ";
      if (isWeekend) classes += "weekend-date ";
      return classes.trim();
    }
  };
  // Handle date click to set selected date and events
  const handleDateClick = (date) => {
    setDate(date);
    const selectedDateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    console.log(date);
    console.log(selectedDateString);
    const eventsForSelectedDate = events.filter((event) => {
      const eventDateString = event.start_date.split(" ")[0];
      return eventDateString === selectedDateString;
    });
    setSelectedDateEvents(eventsForSelectedDate);
  };

  return (
    <div className="p-4   flex">
      <Calendar
        onChange={handleDateClick}
        value={date}
        tileClassName={tileClassName}
      
        calendarType="islamic"
        className="w-96"
      />
      <div className=" text-white ml-5">
        <div className="flex mb-3">
          <img src={meeting} className="-mt-2 mr-2 " />
          <p className=" text-3xl font-title">Mettings at: {date.toDateString()}</p>
        </div>
        {selectedDateEvents.length > 0 ? (
          <div>
            {selectedDateEvents.map((event) => (
             <div key={event.id}><MeetingDetails meeting={event}/></div>
            ))}
          </div>
        ) : (
          <p className="font-content">No events for this date.</p>
        )}
      </div>
    </div>
  );
}
