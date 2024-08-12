import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import FormatQuoteSharpIcon from "@mui/icons-material/FormatQuoteSharp";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";
import QueryBuilderSharpIcon from "@mui/icons-material/QueryBuilderSharp";
import CalendarTodaySharpIcon from "@mui/icons-material/CalendarTodaySharp";
import PauseSharpIcon from "@mui/icons-material/PauseSharp";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
export default function TimeSheet({ timesheets }) {
  const extractTime = (datetime) => {
    return datetime.split(" ")[1];
  };
  const formatDate = (datetime) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="font-content text-white overflow-hidden rounded-3xl border border-shade">
      <table className="min-w-full border">
        <thead>
          <tr className="text-white">
            <th className="px-4 py-2 pr-5">
              <PersonSharpIcon /> Employee
            </th>
            <th className="px-4 py-2">
              <FormatQuoteSharpIcon /> Discription
            </th>
            <th className="px-4 py-2">
              <PlayArrowSharpIcon />Start
            </th>
            <th className="px-4 py-2">
              <PauseSharpIcon />End
            </th>
            <th className="px-4 py-2">
              <TaskAltSharpIcon />Total time
            </th>
          </tr>
        </thead>
        <tbody>
          {timesheets && timesheets.length > 0 ? (
            timesheets.map((timeSheet, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-lightgray" : "bg-gray"}
              >
                <td className="flex justify-center items-center px-4 py-2">
                  <Avatar src={timeSheet.employee.image} />
                  <div className="pl-2">
                    <p>{timeSheet.employee.name}</p>
                  </div>
                </td>
                <td className="text-center px-4 py-2">
                  {timeSheet.description}
                </td>
                <td className="text-center px-4 py-2">
                  <div className="flex">
                    <CalendarTodaySharpIcon />
                    {formatDate(timeSheet.start_date)}
                    <div className=" pl-2 font-number">
                      <QueryBuilderSharpIcon />
                      {extractTime(timeSheet.start_date)}
                    </div>
                  </div>
                </td>
                <td className="text-center px-4 py-2">
                  {timeSheet.end_date ? (
                    <div className="flex">
                      <CalendarTodaySharpIcon />
                      <div className="">
                        {formatDate(timeSheet.end_date)}
                      </div>
                      <div className="pl-2 flex">
                        <QueryBuilderSharpIcon />
                        <div className=" font-number">
                          {extractTime(timeSheet.end_date)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>In progress.....</p>
                  )}
                </td>
                <td className="text-center px-4 py-2">
                  {timeSheet.total_time ? (
                      <div className="pl-2 flex">
                        <QueryBuilderSharpIcon />
                        <div className="pl-2 font-number">
                          {timeSheet.total_time}
                        </div>
                      </div>
                    
                  ) : (
                    <p>In progress.....</p>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr >
             <td>
             </td>
             <td>
             </td>
             <td className=" "  >
                No timesheets available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
