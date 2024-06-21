import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ButtonComponent from "../components/ButtonComponent";
import { Form } from "react-router-dom";
const Modal = ({ title, onClose, onSave, children }) => {
  return (
    <div className="fixed inset-0 ">
      <div className="flex items-center justify-center  px-4 pt-4 pb-20 text-center">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div className=" sm:p-6 sm:pb-4 inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center">
            <h3
              className=" font-title font-bold   text-background  mb-7"
              id="modal-title"
            >
              {title}
            </h3>
            <div className="inline mb-10">
              <button type="button" onClick={onClose}>
                <CloseIcon className="text-background" />
              </button>
            </div>
          </div>
          <Form className="" method="POST">
            <div className="pb-10">{children}</div>
            <div className="flex justify-between items-center">
              <ButtonComponent label="Creat project" onClick={onSave} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Modal;