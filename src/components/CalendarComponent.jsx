import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Keep this for default styles
import "./CustomCalendar.css"; // Import custom styles

const events = [
  {
    id: 1,
    start_date: "2024-12-01 10:30:00",
    title: "test",
    status: 0,
    status_name: "PENDING",
    client: {
      /* ... */
    },
    requester_type: "Company",
    created_at: "2024-08-13T10:45:39.000000Z",
    updated_at: "2024-08-13T10:45:39.000000Z",
  },
  {
    id: 2,
    start_date: "2024-08-13 00:00:00",
    title: "first meeting",
    status: 0,
    status_name: "PENDING",
    client: {
      /* ... */
    },
    requester_type: "Company",
    created_at: "2024-08-13T19:02:35.000000Z",
    updated_at: "2024-08-13T19:02:35.000000Z",
  },
  {
    id: 3,
    start_date: "2024-08-14 23:11:00",
    title: "First meeting",
    status: 1,
    status_name: "ACCEPTED",
    client: {
      /* ... */
    },
    requester_type: "Company",
    created_at: "2024-08-13T20:11:58.000000Z",
    updated_at: "2024-08-13T20:16:57.000000Z",
  },
];

const CalendarWithEvents = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Extract unique dates from the events
  const highlightDates = events.map((event) => {
    const eventDate = new Date(event.start_date.split(" ")[0]);
    return eventDate;
  });

  const tileClassName = ({ date: tileDate, view }) => {
    if (view === "month") {
      const isWeekend = tileDate.getDay() === 0 || tileDate.getDay() === 6;
      const isHighlighted = highlightDates.some(
        (highlightDate) => tileDate.toDateString() === highlightDate.toDateString()
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
    <div className="p-4  flex">
      <Calendar
        onChange={handleDateClick}
        value={date}
        tileClassName={tileClassName}
        className=""
        calendarType="islamic"
      />
      <div className="mt-4 ml-3 text-white">
        <h2>Events for {date.toDateString()}</h2>
        {selectedDateEvents.length > 0 ? (
          <div>
            {selectedDateEvents.map((event) => (
              <li key={event.id} className="border p-2 mb-2 rounded-lg">
                <strong>{event.title}</strong>
                <p>Status: {event.status_name}</p>
                <p>Requester Type: {event.id}</p>
              </li>
            ))}
          </div>
        ) : (
          <p>No events for this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarWithEvents;
