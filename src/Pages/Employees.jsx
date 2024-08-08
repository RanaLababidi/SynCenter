import React, { useState, useCallback } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Title from "../components/Title";
import ButtonComponent from "../components/ButtonComponent";
import EmployeeProfile from "./EmployeeProfile";
import Model from "../Pages/Model";
import FormModelRequired from "../components/FormModelRequired";
import MenuLevels from "../components/MenuLevels"
import { storeEmpolyee } from "../http";

function Employees() {
  const data = useRouteLoaderData("employees");
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [level, setLevel] = useState(null);
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();

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

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleCloseModal = () => {
    setShowDetails(false);
    setSelectedEmployee(null);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
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
    formData.append("phone", phone);
    formData.append("title", title);
    formData.append("level", level);

    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    if (file != null) {
      formData.append("image", file);
    }

    try {
      const response = await storeEmpolyee(formData);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Title title="Employees" />
        <div className="inline">
          <ButtonComponent label="Add new employee" onClick={handleOpen} />
        </div>
      </div>
      <div className="text-white font-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((employee) => (
          <div
            className="focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6 hover:border-pistach relative flex flex-col items-center justify-center"
            key={employee.id}
          >
            <img
              className="w-40 h-40 object-cover rounded-full"
              src={employee.image}
              alt={`${employee.name} logo`}
            />
            <h5 className="text-xl font-bold">{employee.name}</h5>
            <div className="flex items-center">
              <p>{employee.title} /</p>
              <div className="text-shade ">{employee.level} </div>
            </div>
            <button
              className="underline text-pistach font-bold hover:text-white"
              onClick={() => handleOpenModal(employee)}
            >
              See More
              <MoreHorizIcon />
            </button>
          </div>
        ))}
      </div>

      {showDetails && selectedEmployee && (
        <EmployeeProfile
          employee={selectedEmployee}
          onClose={handleCloseModal}
        />
      )}
      {showModal && (
        <Model
          title="New employee"
          onClose={handleClose}
          onSave={handleSave}
          labelButton={"Add new employee"}
        >
          <FormModelRequired
            label="Name:"
            id="name"
            type="text"
            placeholder="Enter employee name"
            onChange={(e) => setName(e.target.value)}
          />
          <FormModelRequired
            label="Email:"
            id="email"
            type="email"
            value={email}
            placeholder="Enter employee email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handelInputBlur("email")}
          />
          <div className="text-redcolor">
            {emailIsValid && <p>Please enter a valid email address</p>}
          </div>
          <FormModelRequired
            label="Phone:"
            id="phone"
            type="phone"
            value={phone}
            placeholder="Enter employee phone"
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handelInputBlur("phone")}
          />
          <FormModelRequired
            label="Jop title:"
            id="title"
            type="text"
            placeholder="Enter employee jop title "
            onChange={(e) => setTitle(e.target.value)}
          />
          <MenuLevels onClientSelect={setLevel} />
          <FormModelRequired
            label="Password:"
            id="password"
            type="password"
            placeholder="Enter employee password"
            onChange={(e) => setPassword(e.target.value)}
            length="8"
          />
          <FormModelRequired
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
    </div>
  );
}

export default Employees;
