import React from "react";
import { Chart } from "react-google-charts";

export default function TasksChart({ data }) {
  const totalTasks =
    data.todo_tasks_count +
    data.doing_tasks_count +
    data.tocheck_tasks_count +
    data.done_tasks_count;

  const chartData = [
    ["Task", "Percentage"],
    ["To Do", (data.todo_tasks_count / totalTasks) * 100],
    ["Doing", (data.doing_tasks_count / totalTasks) * 100],
    ["To Check", (data.tocheck_tasks_count / totalTasks) * 100],
    ["Done", (data.done_tasks_count / totalTasks) * 100],
  ];

  const options = {
    title: "Tasks Distribution",
    pieHole: 0.4,
    is3D: false,
    backgroundColor: {
      fill: "#111827", // Background color of the chart
    },
    chartArea: {
      backgroundColor: {
        fill: "#111827", // Background color of the chart area
      },
    },
    legend: {
      textStyle: {
        color: "#ffffff", // Color of the legend text
      },
    },
    titleTextStyle: {
      color: "#ffffff", // Color of the title text
    },
    slices: {
      
        0: { color: '#59253b' },  // Color for "To Do"
        1: { color: '#584c2a' },  // Color for "Doing"
        2: { color: '#3a3068' },  // Color for "To Check"
        3: { color: '#0d3f67' },  // Color for "Done"
      },
  };

  return (
    <div className="w-full bg-gray-300 p-4 rounded-lg">
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"300px"}
      />
    </div>
  );
}
