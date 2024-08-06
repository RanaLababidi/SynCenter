import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const formatDay = (dateStr) => {
  const date = new Date(dateStr);
  const dayOfMonth = date.getDate();
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${dayOfMonth}`;
};
const formatMonth = (dateStr) => {
  const date = new Date(dateStr);
  const dayOfMonth = date.getDate();
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${monthName}`;
};
const formatYear = (dateStr) => {
  const date = new Date(dateStr);
  const dayOfMonth = date.getDate();
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${year}`;
};
export default function StartEndDate({ start, end }) {
  return (
    <div className=" mr-10 inline-flex  items-center text-center">
      <div>
        <div className=" font-number bg-white border-t-4 rounded-2xl border-blue-700 w-16 ">
          {formatDay(start)}
          <div className="font-content">{formatMonth(start)}</div>
          <div className="font-number text-xs">{formatYear(start)}</div>
        </div>
      </div>
      <ArrowRightAltIcon fontSize="large" />
      <div>
        <div className="font-number bg-white border-t-4 border-red-700 rounded-2xl w-16 ">
          {formatDay(end)}
          <div className="font-content">{formatMonth(end)}</div>
          <div className="font-number text-xs">{formatYear(end)}</div>
        </div>
      </div>
    </div>
  );
}
