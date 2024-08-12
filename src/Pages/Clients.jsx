import React, { useState, useCallback } from "react";
import Title from "../components/Title";
import ButtonComponent from "../components/ButtonComponent";
import Avatar from "../components/Avatar";
import Model from "../Pages/Model";
import FormModelRequired from "../components/FormModelRequired";
import FormModel from "../components/FormModel";
import { storeClient, deleteClient, updateClient } from "../http";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Success from "../components/Success";
import CardButton from "../components/CardButton";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import deleteGif from "../assets/delete.gif";
import { useRouteLoaderData } from "react-router-dom";
const Clients = () => {
  const data = useRouteLoaderData("clients");
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const foundObject = data.find((item) => item.id === selectedClientId) || {};
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
    password_confirmation: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const formatDate = (datetime) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", options);
  };

  const handelInputBlur = useCallback((identifier) => {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }, []);
  const emailIsValid = didEdit.email && email && !email.includes("@");

  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleCloseEdit = () => {
    setShowModalEdit(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (password !== password_confirmation) {
      setPasswordMatch(true);
      return;
    }
    console.log(file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    if (file != null) {
      formData.append("image", file);
    }
   
    try {
      const response = await storeClient(formData);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  const handleSaveEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (password !== password_confirmation) {
      setPasswordMatch(true);
      return;
    }
    if (password !== password_confirmation) {
      setPasswordMatch(true);
      return;
    }
    formData.append("_method", "put");
    formData.append("name", name);
    formData.append("email", email);
    if (password !== "") {
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
    }
    if (file != null) {
      formData.append("image", file);
    }
    console.log(formData);

    try {
      const response = await updateClient(formData, selectedClientId);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating project:", error.message);
      // Display a user-friendly error message
      alert(`Failed to update project: ${error.message}`);
    }
  };
  const handleCancelDelete = () => {
    setShowConfirm(false);
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteClient(id);
      setShowConfirm(false);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <div className=" text-white font-content">
        <div className=" flex justify-between items-center">
          <Title title="Clients" />
          <div className="inline">
            <ButtonComponent label="Add new Client" onClick={handleOpen} />
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-shade">
          <table className="min-w-full border">
            <thead>
              <tr className="text-white">
                <th className=" px-4 py-2">#</th>
                <th className=" px-4 py-2 pr-5 ">Name</th>
                <th className=" px-4 py-2">Email</th>
                <th className=" px-4 py-2">Phone</th>
                <th className=" px-4 py-2">Created At</th>
                <th className=" px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((clients, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-lightgray" : "bg-gray"}
                >
                  <td className=" text-center px-4 py-2">{index}</td>
                  <td className="flex justify-center items-center   px-4 py-2">
                    <Avatar src={clients.image} />
                    <div className="pl-2 ">
                      <p className="">{clients.name}</p>
                    </div>
                  </td>
                  <td className=" text-center px-4 py-2">{clients.email}</td>
                  <td className=" text-center px-4 py-2">0997499848</td>
                  <td className=" text-center px-4 py-2">
                    {formatDate(clients.created_at)}
                  </td>
                  <td className=" text-center px-4 py-2">
                    <button
                      className=" text-inherit hover:text-pistach transition-colors duration-300"
                      onClick={() => {
                        setSelectedClientId(clients.id);
                        setName(clients.name);
                        setEmail(clients.email);
                        setShowModalEdit(true);
                      }}
                    >
                      <ModeEditOutlineSharpIcon />
                    </button>
               
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <Model
          title="New client"
          onClose={handleClose}
          onSave={handleSave}
          labelButton={"Add new client"}
        >
          <FormModelRequired
            label="Name:"
            id="name"
            type="text"
            placeholder="Enter client name"
            onChange={(e) => setName(e.target.value)}
          />
          <FormModelRequired
            label="Email:"
            id="email"
            type="email"
            value={email}
            placeholder="Enter client email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handelInputBlur("email")}
          />
          <div>{emailIsValid && <p>Please enter a valid email address</p>}</div>

          <FormModelRequired
            label="Password:"
            id="password"
            type="password"
            placeholder="Enter client password"
            onChange={(e) => setPassword(e.target.value)}
            length="8"
          />
          <FormModelRequired
            label="Confirm password:"
            id="password_confirmation"
            type="password"
            placeholder=" Re-enter client password"
            onChange={(e) => setPassword_confirmation(e.target.value)}
            length="8"
          />
          <div>
            {passwordMatch && (
              <p className="text-redcolor">The password field confirmation does not match </p>
            )}
          </div>

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
        </Model>
      )}
      {showConfirm && selectedClientId && (
        <Success
          text={"Are you sure you want to delete this project?"}
          onClose={handleCancelDelete}
          Icon={CloseSharpIcon}
          gif={deleteGif}
        >
          <CardButton
            label={"Delete"}
            onClick={() => handleDelete(selectedClientId)}
            Icon={DeleteOutlineSharpIcon}
            color={"redcolor"}
          />
        </Success>
      )}
      {showModalEdit && (
        <Model
          title="Edite Client"
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
          labelButton={"Update Client"}
        >
          <FormModelRequired
            label="Name:"
            id="name"
            type="text"
            placeholder="Enter client name"
            defaultValue={foundObject.name}
            onChange={(e) => setName(e.target.value)}
            onBlur
          />
          <FormModelRequired
            label="Email:"
            id="email"
            type="email"
            placeholder="Enter client email"
            defaultValue={foundObject.email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handelInputBlur("email")}
          />

          <FormModel
            label="Password:"
            id="password"
            type="password"
            placeholder="Enter client password"
            onChange={(e) => setPassword(e.target.value)}
            length="8"
          />
          <FormModel
            label="Confirm password:"
            id="password_confirmation"
            type="password"
            placeholder=" Re-enter client password"
            onChange={(e) => setPassword_confirmation(e.target.value)}
            length="8"
          />
          <div>
            {passwordMatch && (
              <p className="text-redcolor">The password field confirmation does not match </p>
            )}
          </div>

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
                defaultValue={data.log}
              />
            </label>
          </div>
        </Model>
      )}
    </div>
  );
};

export default Clients;
