import React, { useState } from "react";
import Title from "../components/Title";
import ButtonComponent from "../components/ButtonComponent";
import Model from "../Pages/Model";
import { useRouteLoaderData } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { storeFile } from "../http";
import deleteGif from "../assets/delete.gif";
import Avatar from "../components/Avatar";
import Success from "../components/Success";
import CardButton from "../components/CardButton";
import fileIcon from "../assets/file.png";

import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { deleteFiles, deleteEmployee } from "../http";

export default function Files() {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState();
  const [selectedFileId, setSelectedFileId] = useState();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const project = useRouteLoaderData("projectsDetails");
  const data = useRouteLoaderData("files");
  const formatDate = (datetime) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", options);
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
    formData.append("file", file);
    try {
      const response = await storeFile(formData, project.id);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };
  const getFileName = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  };
  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteFiles(id);
      setShowConfirmDelete(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        <Title title="All files for this project :" />
        <div className="inline">
          <ButtonComponent label="Add new files" onClick={handleOpen} />
        </div>
      </div>
      <div className="  font-content text-white overflow-hidden rounded-3xl border border-shade">
        <table className="min-w-full border">
          <thead>
            <tr className="text-white">
              <th className=" px-4 py-2">#</th>
              <th className=" px-4 py-2 pr-5 ">Name</th>
              <th className=" px-4 py-2">Publisher</th>
              <th className=" px-4 py-2">Created At</th>
              <th className=" px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((files, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-lightgray" : "bg-gray"}
              >
                <td className=" text-center ">
                  <div className="flex justify-center"> <img src={fileIcon} alt="File Icon" className="size-6" />{files.id} </div>
                </td>
                <td className=" text-center px-4 py-2">
                  {getFileName(files.url)}
                </td>
                <td className="flex justify-center items-center px-4 py-2">
                  <Avatar src={files.image} />
                  <div className="pl-2 ">
                    <p className="">Rana imad </p>
                  </div>
                </td>
                <td className=" text-center px-4 py-2">
                  {formatDate(files.created_at)}
                </td>
                <td className=" text-center px-4 py-2">
                  <button
                    className=" text-inherit hover:text-pistach transition-colors duration-300"
                    onClick={() => {
                      setSelectedFileId(files.id);
                      setShowConfirmDelete(true);
                    }}
                  >
                    <DeleteSharpIcon />
                  </button>
                  <a
                    href={files.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-inherit hover:text-pistach transition-colors duration-300"
                  >
                    <FileDownloadSharpIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showConfirmDelete && (
        <Success
          text={"Are you sure you want to delete this files?"}
          onClose={handleCancelDelete}
          Icon={CloseSharpIcon}
          gif={deleteGif}
        >
          <CardButton
            label={"Delete"}
            onClick={() => handleDelete(selectedFileId)}
            Icon={DeleteSharpIcon}
            color={"redcolor"}
          />
        </Success>
      )}

      {/* store */}
      {showModal && (
        <Model
          title="Upload file"
          onClose={handleClose}
          onSave={handleSave}
          labelButton={"Upload new file"}
        >
          <div className="container mx-auto p-4">
            <label
              htmlFor="photo"
              className="relative flex flex-col items-center justify-center bg-white border-dashed border-26 border-background h-20 w-full rounded-lg shadow-sm cursor-pointer hover:border-pistach focus-within:border-pistach"
            >
              <DriveFolderUploadOutlinedIcon className="text-pistach" />
              {file ? file.name : "Click to upload file"}
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
