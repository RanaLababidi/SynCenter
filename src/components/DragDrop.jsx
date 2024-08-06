import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TaskAssignees from "./TaskAssignees";
import StartEndDate from "./StartEndDate";
import TaskDetails from "../Pages/TasksDetails";

const getItemBgColor = (columnId) => {
  switch (columnId) {
    case "TODO":
      return "bg-blueTasksBg";
    case "DOING":
      return "bg-redTaskBg";
    case "TO_CHECK":
      return "bg-yellowTaskBg";
    case "DONE":
      return "bg-greenTaskBg";
    default:
      return "bg-gray-600";
  }
};

const getItemTextColor = (columnId) => {
  switch (columnId) {
    case "TODO":
      return "text-blue-900";
    case "DOING":
      return "text-red-900";
    case "TO_CHECK":
      return "text-yellow-900";
    case "DONE":
      return "text-green-900";
    default:
      return "text-gray-900";
  }
};

export default function DragDrop({ initialColumns }) {
  const [columns, setColumns] = useState(initialColumns);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleCloseModal = () => {
    setShowDetails(false);
    setSelectedEmployee(null);
  };
  const handleButtonClick = (task) => {
    navigate(`${task.id}`, { state: { task } });
  };

  // Handle drag start
  const onDragStart = (event, itemId) => {
    event.dataTransfer.setData("itemId", itemId);
  };

  // Handle drop event
  const onDrop = (event, columnId) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("itemId");
    const sourceColumnId = Object.keys(columns).find((colId) =>
      columns[colId].some((item) => item.id === parseInt(itemId))
    );
    if (!sourceColumnId || sourceColumnId === columnId) return;

    const sourceColumn = columns[sourceColumnId];
    const destColumn = columns[columnId];
    const item = sourceColumn.find((item) => item.id === parseInt(itemId));

    // Remove item from source column and add to destination column
    const updatedSourceItems = sourceColumn.filter(
      (item) => item.id !== parseInt(itemId)
    );
    const updatedDestItems = [...destColumn, item];

    setColumns({
      ...columns,
      [sourceColumnId]: updatedSourceItems,
      [columnId]: updatedDestItems,
    });
  };

  // Handle drag over to allow dropping
  const onDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex justify-center h-full main-h-screen space-x-4">
      {Object.entries(columns).map(([columnId, tasksArray]) => (
        <div
          key={columnId}
          className="flex flex-col w-full border border-white border-b-2 rounded-3xl p-2"
          onDrop={(event) => onDrop(event, columnId)}
          onDragOver={onDragOver}
        >
          <div className="inline-flex w-full border-b-2 border-white">
            <ArrowRightIcon className="mt-2 text-white" />
            <h2 className="text-lg font-title text-white mt-2">{columnId}</h2>
          </div>

          <div className="w-full mt-4 ">
            {tasksArray.map((item) => (
              <button onClick={() => handleButtonClick(item)}>
                <div
                  key={item.id}
                  draggable
                  onDragStart={(event) => onDragStart(event, item.id)}
                  className={`${getItemBgColor(columnId)} ${getItemTextColor(
                    columnId
                  )} font-content p-5 w-60 mb-2 rounded-2xl cursor-pointer m-4`}
                >
                  <div className="text-lg font-bold text-start ">
                    {item.title}
                  </div>

                  {/* employee */}
                  <div className=" mb-3 flex items-center">
                    <p className="mr-4">Assignees:</p>
                    {item.employees.map((employee) => (
                      <img
                        key={employee.id}
                        src={employee.image}
                        alt={employee.name}
                        className="w-7 h-7 rounded-full -ml-3 first:ml-0"
                      />
                    ))}

                    {showDetails && selectedEmployee && (
                      <TaskAssignees
                        employees={selectedEmployee}
                        onClose={handleCloseModal}
                      />
                    )}
                    {showDetails && selectedTask && (
                      <TaskDetails
                        Task={setSelectedTask}
                        onClose={handleCloseModal}
                      />
                    )}
                  </div>

                  {/* date */}
                  <StartEndDate start={item.start_date} end={item.end_date} />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
