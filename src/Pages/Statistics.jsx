import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import Title from "../components/Title";
import StatisticsCard from "../components/StatisticsCard";
import WorkOutlineSharpIcon from "@mui/icons-material/WorkOutlineSharp";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import GroupsSharpIcon from "@mui/icons-material/GroupsSharp";
import TasksChart from "../components/TasksChart"; 

export default function Statistics() {
  const data = useRouteLoaderData("statistics");

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Title title="Statistics" />
      </div>
      <div className="text-white font-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-3">
        <StatisticsCard
          title="Employees count"
          Icon={EngineeringOutlinedIcon}
          content={data.employees_count}
          disc="Total number of Employees working in your company."
        />
        <StatisticsCard
          title="Projects count"
          Icon={WorkOutlineSharpIcon}
          content={data.projects_count}
          disc="The total number of projects you are working on in your company."
        />
        <StatisticsCard
          title="Clients count"
          Icon={SwitchAccountOutlinedIcon}
          content={data.clients_count}
          disc="Total number of Clients that your company is working with."
        />
        <StatisticsCard
          title="Today meetings count"
          Icon={GroupsSharpIcon}
          content={data.today_meetings_count}
          disc="Total number of meetings scheduled for today."
        />
        <div className="bg-gray mt-1 block w-full rounded-2xl shadow-sm focus:ring-2 focus:ring-inset col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
        <TasksChart data={data} />
        </div>
      </div>
    </div>
  );
}
