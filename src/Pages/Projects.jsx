import React, { useState } from "react";
import {
  Form,
  Link,
  useRouteLoaderData,
  useSubmit,
  useParams,
} from "react-router-dom";
import Title from "../components/Title";
import Modal from "../Pages/Model";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";
import Success from "../components/Success";
import FormModel from "../components/FormModel";
import CardButton from "../components/CardButton";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import successGif from "../assets/Animation - 1716113873825 (1).gif";
import deleteGif from "../assets/delete.gif";
import {  storeProject } from "../http";

function Projects() {
  const data = useRouteLoaderData("projects");
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClientId, setSelectedClientId] = useState(null);


  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleClosSuccess = () => {
    setSuccessMessage(false);
    window.location.reload();
  };
 
  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("client_id", selectedClientId);
    formData.append("logo", file);  
    try {
      const response = await storeProject(formData);
      setShowModal(false);
      setSuccessMessage(true);
      window.location.reload();

    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const formatDate = (datetime) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Title title="Projects" />
        <div className="inline">
          <ButtonComponent label="Add new Project" onClick={handleOpen} />
        </div>
      </div>
      <div className=" text-white font-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((project) => (
          <div
            className="bg-lightgray mt-1 block w-full border-2   rounded-lg py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6 hover:border-pistach"
            key={project.id}
          >
            <div className="m-5">
              <Link to={`${project.id}/info`}>
                <img className="w-full h-56 object-cover " src={project.logo} />
                <div className="  ">
                  <h5 className="text-xl font-bold mb-2 mt">{project.name}</h5>
                  <div className="flex items-center ">
                    <img
                      className="rounded-full h-8 w-8 "
                      src={project.client.image}
                      alt="Client"
                    />
                    <div className="pl-2">
                      <p className="text-xl">{project.client.name}</p>
                      <div className="text- text-xs">
                        {formatDate(project.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {showConfirm && selectedProjectId && (
              <Success
                text={"Are you sure you want to delete this project?"}
                onClose={handleCancelDelete}
                Icon={CloseSharpIcon}
                gif={deleteGif}
              >
                <CardButton
                  label={"Delete"}
                  onClick={() => handleDelete(selectedProjectId)}
                  Icon={DeleteOutlineSharpIcon}
                  color={"red-500"}
                />
              </Success>
            )}
          </div>
        ))}
      </div>

      {successMessage && (
        <Success
          text={"Added a new project Successfully ..."}
          gif={successGif}
          onClose={handleClosSuccess}
        />
      )}

      {showModal && (
        <Modal title="New Project" onClose={handleClose} onSave={handleSave} labelButton={"Add new project"}>
          <FormModel
            label="project name:"
            id="name"
            type="text"
            placeholder="Enter project name"
            onChange={(e) => setName(e.target.value)}
          />

          <FormModel
            label="description:"
            id="description"
            type="text"
            placeholder="Enter project description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Menu onClientSelect={setSelectedClientId} />
          <label className="font-title font-bold block text-background mt-3">
            Image:
          </label>
          <div className="container mx-auto p-4">
            <label
              htmlFor="photo"
              className="relative flex flex-col items-center justify-center bg-white border-dashed border-2 border-background h-20 w-full rounded-lg shadow-sm cursor-pointer hover:border-pistach focus-within:border-pistach"
            >
              <AddPhotoAlternateOutlinedIcon className="text-pistach" />
              {file ? file.name : "Click to upload image"}
              <input
                type="file"
                id="photo"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Projects;

async function AddProject(formData) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch("http://192.168.1.5:8000/company/projects", {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }
  const responseData = await response.json();
  return responseData;
}
