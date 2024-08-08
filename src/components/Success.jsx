import React, { Children, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import FormModelRequired from "./FormModelRequired";
import CardButton from "../components/CardButton";

const Success = ({ text, title, onClose, children, gif,Icon }) => {
  return (
    <div className="fixed inset-0 ">
      <div className="flex items-center justify-center  px-4 pt-4 pb-20 text-center">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div className=" sm:p-6 sm:pb-4 inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <img src={gif} className="w-1/3 mx-auto" alt="Forgot Password" />
          <h1 className="font-title text-center mb-2 text-xl font-bold leading-9 tracking-tight text-background">
            {text}
          </h1>
          <div className="text-center ml-5 mr-5">
            <CardButton label="close" onClick={onClose} color={"pistach"} Icon={Icon} />
            <span className="p-20"></span>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
