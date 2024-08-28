import React, { useState } from "react";
import Title from "../components/Title";
import ButtonComponent from "../components/ButtonComponent";
import Model from "../Pages/Model";
import FormModelRequired from "../components/FormModelRequired";
import MenuEmployees from "../components/MenuEmployees";
import { storeTask } from "../http";
import { useRouteLoaderData } from "react-router-dom";
import DragDrop from "../components/DragDrop";
export default function Tasks() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const data = useRouteLoaderData("projectsDetails");
  const tasksData = useRouteLoaderData("tasks");

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", name);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("description", description);
    formData.append("project_id", data.id);
    selectedEmployees.forEach((employee, index) => {
      formData.append(`employees[${index}]`, employee);
    });
    try {
      const response = await storeTask(formData);
      setShowModal(false);
      window.location.reload();

    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Title title="All tasks for this project :" />
        <div className="inline">
          <ButtonComponent label="Add new Task" onClick={handleOpen} />
        </div>
      </div>
      <DragDrop initialColumns={tasksData} />
      <div className="text-white font-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>
      {showModal && (
        <Model
          title="New Task"
          onClose={handleClose}
          onSave={handleSave}
          labelButton={"Create new task"}
        >
          <FormModelRequired
            label="Task Title:"
            id="name"
            type="text"
            placeholder="Enter task title"
            onChange={(e) => setName(e.target.value)}
          />
          <FormModelRequired
            label="Task description:"
            id="description"
            type="text"
            placeholder="Enter task description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <MenuEmployees onClientSelect={setSelectedEmployees} />
          <div className="flex space-x-10">
            <FormModelRequired
              label="Start date:"
              id="startDate"
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FormModelRequired
              label="End date:"
              id="endDate"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="mb-5" />
        </Model>
      )}
    </div>
  );
}
