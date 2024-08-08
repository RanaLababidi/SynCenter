import React, { useState, useCallback } from "react";

import CloseIcon from "@mui/icons-material/Close";
import CardButton from "../components/CardButton";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import MenuLevels from "../components/MenuLevels";
import Model from "../Pages/Model";
import FormModel from "../components/FormModel";
import FormModelRequired from "../components/FormModelRequired";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { updateEmployee, deleteEmployee } from "../http";
import Success from "../components/Success";
import deleteGif from "../assets/delete.gif";

const EmployeeProfile = ({ employee, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [file, setFile] = useState();
  const [name, setName] = useState(employee.name);
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(employee.email);
  const [phone, setPhone] = useState(employee.phone);
  const [title, setTitle] = useState(employee.title);
  const [level, setLevel] = useState(employee.level_translation);
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
    password_confirmation: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handelInputBlur = useCallback((identifier) => {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }, []);
  const emailIsValid = didEdit.email && email && !email.includes("@");

  const formatDate = (datetime) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", options); // Adjust locale as needed
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleSave = async (event) => {
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
    formData.append("phone", phone);
    formData.append("title", title);
    formData.append("level", level);

    

    if (password !== "") {
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
    }
    if (file != null) {
      formData.append("image", file);
    }
  
    try {
      console.log(employee.level_translation)
      const response = await updateEmployee(formData, employee.id);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating employee:", error.message);
      // Display a user-friendly error message
      alert(`Failed to update employee: ${error.message}`);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteEmployee(id);
      setShowConfirm(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center pt-20  bg-gray-800 bg-opacity-75 backdrop-blur-xl ">
        <div className="backdrop-blur-xl bg-gray font-content   text-white border-2  border-white  rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full ">
          <div className="absolute top-0 right-0 p-4">
            <button type="button" onClick={onClose}>
              <CloseIcon className="text-gray-600" />
            </button>
          </div>
          <div className="px-6 py-2">
            <div className="flex justify-center mb-4">
              <img
                className="w-32 h-32 rounded-full border-2 border-gray-300"
                src={employee.image}
                alt={`${employee.name} profile`}
              />
            </div>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-title font-semibold">
                {employee.name}
              </h2>
              <div className="flex justify-center text-shade">
                <div className="">{employee.title}/</div>
                <div className=" ">{employee.level}</div>
              </div>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[60vh]">
              <div>
                <div className="font-semibold tracking-widest">Email:</div>
                <div className="text-shade">{employee.email}</div>
              </div>
              <div>
                <div className="font-semibold tracking-widest">Phone:</div>
                <div className="text-shade">{employee.phone}</div>
              </div>
              <div>
                <div className="font-semibold tracking-widest">Started at:</div>
                <div className="text-shade">
                  {formatDate(employee.created_at)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-4 pb-3">
            <div className="pr-5">
              <CardButton
                onClick={handleOpen}
                label={"Edit"}
                Icon={ModeEditOutlineSharpIcon}
                color={"pistach"}
              />
            </div>
            <CardButton
              onClick={() => {
                setShowConfirm(true);
              }}
              label={"Delete"}
              Icon={DeleteOutlineSharpIcon}
              color={"redcolor"}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <Model
          title="Edite Employee"
          onClose={handleClose}
          onSave={handleSave}
          labelButton={"Update Employee"}
        >
          <FormModelRequired
            label="Name:"
            id="name"
            type="text"
            placeholder="Enter employee name"
            defaultValue={employee.name}
            onChange={(e) => setName(e.target.value)}
            onBlur
          />
          <FormModelRequired
            label="Email:"
            id="email"
            type="email"
            placeholder="Enter employee email"
            defaultValue={employee.email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handelInputBlur("email")}
          />
          <FormModelRequired
            label="Phone:"
            id="phone"
            type="phone"
            placeholder="Enter employee phone"
            defaultValue={employee.phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handelInputBlur("phone")}
          />
          <FormModel
            label="Jop title:"
            id="title"
            type="text"
            placeholder="Enter employee jop title "
            defaultValue={employee.title}
            onBlur={() => handelInputBlur("title")}
            onChange={(e) => setTitle(e.target.value)}
          />
          <MenuLevels onClientSelect={setLevel} clientId={level} />

          <FormModel
            label="Password:"
            id="password"
            type="password"
            placeholder="Enter employee password"
            onChange={(e) => setPassword(e.target.value)}
            length="8"
          />
          <FormModel
            label="Confirm password:"
            id="password_confirmation"
            type="password"
            placeholder=" Re-enter employee password"
            onChange={(e) => setPassword_confirmation(e.target.value)}
            length="8"
          />
          <div>
            {passwordMatch && (
              <p className="text-redcolor">
                The password field confirmation does not match{" "}
              </p>
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
      {showConfirm && (
        <Success
          text={"Are you sure you want to delete this employee?"}
          onClose={handleCancelDelete}
          Icon={CloseSharpIcon}
          gif={deleteGif}
        >
          <CardButton
            label={"Delete"}
            onClick={() => handleDelete(employee.id)}
            Icon={DeleteOutlineSharpIcon}
            color={"redcolor"}
          />
        </Success>
      )}
    </div>
  );
};

export default EmployeeProfile;
