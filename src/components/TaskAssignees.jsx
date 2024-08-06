import React, { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CallSharpIcon from "@mui/icons-material/CallSharp";

const TaskAssignees = ({ employees, onClose }) => {
  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pt-20 bg-gray-800 bg-opacity-75 backdrop-blur-xl"
      onClick={handleBackdropClick}
    >
      <div className="backdrop-blur-xl bg-gray font-content text-white border-2 border-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="text-center mt-5 text-lg">
          <div>The information for employees assigned tasks</div>
          <div className="border-t-4 border-white"/>
          <div className="absolute top-0 right-0 p-5">
          </div>
        </div>
        <div className="">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-white text-center">
                <th className="px-4 py-2 pr-5">
                  <PersonIcon />
                </th>
                <th className="px-4 py-2">
                  <EmailIcon />
                </th>
                <th className="px-4 py-2">
                  <CallSharpIcon />
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-lightgray" : "bg-gray"}
                >
                  <td className="flex justify-center items-center px-4 py-2">
                    <div className="pl-2">
                      <p>{employee.name}</p>
                    </div>
                  </td>
                  <td className="text-center px-4 py-2">{employee.email}</td>
                  <td className="text-center px-4 py-2">{employee.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignees;
