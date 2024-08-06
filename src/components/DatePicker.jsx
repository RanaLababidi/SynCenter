// src/components/DatePicker.js
import React, { useState } from "react";
import FormModelRequired from "./FormModelRequired";
export default function DatePicker({ onDateChange, label }) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onDateChange(e.target.value);
    console.log(selectedDate)
  };

  return (
    <div className="mt-1">
      <div>
        <label
          className="font-title font-bold block  text-background mt-3 "
        >
          {label}
        </label>
      </div>
      <input
        label="Start date:"
        type="text"
        placeholder="seleect dtart date:"
        value={selectedDate}
        onChange={handleDateChange}
        className="form-input mt-1 block  border border-background rounded-lg py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6"
      />  
    </div>
  );
}
