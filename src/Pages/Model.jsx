import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ButtonComponent from "../components/ButtonComponent";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";

const Model = ({ title, onClose, onSave, children, labelButton }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xl">
      <div className="flex items-center justify-center px-4 pt-4 pb-20 text-center overflow-auto">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div
          className="sm:p-6 sm:pb-4 inline-block align-bottom
         bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <form onSubmit={onSave}>
            <div className="flex justify-between items-center">
              <h3 className="font-title font-bold text-black" id="modal-title">
                {title}
              </h3>

              <div className="inline">
                <Tooltip title="Reset">
                  <button type="reset">
                    <ReplayIcon />
                  </button>
                </Tooltip>

                <button type="button" onClick={onClose}>
                  <CloseIcon className="text-background" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">{children}</div>

            <div className="flex justify-between items-center">
              <ButtonComponent label={labelButton} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Model;
