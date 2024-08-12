import React, { useState, useCallback } from "react";
import { useRouteLoaderData } from "react-router-dom";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import RoofingSharpIcon from "@mui/icons-material/RoofingSharp";
import AlternateEmailSharpIcon from "@mui/icons-material/AlternateEmailSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import EventNoteSharpIcon from "@mui/icons-material/EventNoteSharp";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

import { updateCompany } from "../http";
import Model from "../Pages/Model";
import FormModel from "../components/FormModel";
import FormModelRequired from "../components/FormModelRequired";
export default function Profile() {
  const data = useRouteLoaderData("profile");
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState();
  const [name, setName] = useState(data.name);
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
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
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (password !== "") {
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
    }
    if (file != null) {
      formData.append("image", file);
    }

    try {
      console.log(data.level_translation);
      const response = await updateCompany(formData);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error.message);
      // Display a user-friendly error message
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pt-20  bg-gray-800 bg-opacity-75">
      <div className="overflow-visible relative w-1/2 h-3/4  bg-gray font-content  text-white  rounded-xl text-left  shadow-xl transform transition-all   ">
        <div className="absolute -top-16 ml-7  transform  z-10">
          <h1 className="text-9xl font-bold text-white ">Profile</h1>
        </div>
        <div className="space-y-5 overflow-y-auto max-h-[60vh] mt-16 ml-10">
          <div className="flex">
            <div className="space-y-8">
              <div>
                <div className="text-shade font-semibold tracking-widest">
                  <RoofingSharpIcon /> Company Name:
                </div>
                <div className="ml-2">{data.name}</div>
              </div>
              <div>
                <div className="text-shade font-semibold tracking-widest">
                  <AlternateEmailSharpIcon />
                  Email:
                </div>
                <div className="ml-2">{data.email}</div>
              </div>
              <div>
                <div className="text-shade font-semibold tracking-widest">
                  <LocalPhoneSharpIcon />
                  Phone:
                </div>
                <div className="ml-2">{data.phone}</div>
              </div>
              <div>
                <div className="text-shade font-semibold tracking-widest">
                  <EventNoteSharpIcon />
                  Subscribe at:
                </div>
                <div className="ml-2">{formatDate(data.subscribe_at)}</div>
              </div>
            </div>
            <div className="pl-60">
              <img
                className="w-44 rounded-full "
                src={data.logo}
                alt={`${data.name} profile`}
              />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-9 -right-10 transform">
          <button
            onClick={handleOpen}
            className={`border w-40 h-16 rounded-lg text-gray bg-white   border-pistach  hover:bg-pistach`}
          >
            <div>
              Update <ModeEditOutlineSharpIcon />
            </div>
          </button>
        </div>
      </div>
      {showModal && (
        <Model
          title="Edite Profile"
          onClose={handleClose}
          onSave={handleSave}
          labelButton={"Update Profile"}
        >
          <FormModelRequired
            label="Name:"
            id="name"
            type="text"
            placeholder="Enter company name"
            defaultValue={data.name}
            onChange={(e) => setName(e.target.value)}
            onBlur
          />
          <FormModelRequired
            label="Email:"
            id="email"
            type="email"
            placeholder="Enter company email"
            defaultValue={data.email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handelInputBlur("email")}
          />
          <FormModelRequired
            label="Phone:"
            id="phone"
            type="phone"
            placeholder="Enter company phone"
            defaultValue={data.phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handelInputBlur("phone")}
          />
          <FormModel
            label="Password:"
            id="password"
            type="password"
            placeholder="Enter company password"
            onChange={(e) => setPassword(e.target.value)}
            length="8"
          />
          <FormModel
            label="Confirm password:"
            id="password_confirmation"
            type="password"
            placeholder=" Re-enter company password"
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
