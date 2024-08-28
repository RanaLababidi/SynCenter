import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import { subscribe } from "../http";

export default function Sub({ close, plans }) {
  const [errorMessage, setErrorMessage] = useState("");

  const sendSub = async (id) => {
    try {
      const response = await subscribe(id);

      if (response.success && response.url) {
        window.location.href = response.url; // Redirect to the provided URL
      } else if (!response.success) {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setErrorMessage("You cannot subscribe until at least 15 days before the end of your last subscription.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pt-20 bg-gray-800 bg-opacity-75 backdrop-blur-xl">
      <div className="relative backdrop-blur-xl bg-gray font-content text-white border-2 border-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all">
        <div className="absolute top-0 right-0 p-4">
          <button type="button" onClick={close}>
            <CloseIcon className="text-gray-600" />
          </button>
        </div>
        {errorMessage && (
          <div className="absolute top-0    text-red-500 text-center p-2 z-10">
            {errorMessage}
          </div>
        )}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 rounded-full">
          {plans.map((plan) => (
            <button key={plan.id} onClick={() => sendSub(plan.id)}>
              <div className="w-80 h-40 ml-8 rounded-full shadow-2xl backdrop-blur-xl p-5 text-white border border-white focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6 hover:border-pistach">
                <div className="font-title text-3xl text-center">
                  {plan.name}
                </div>
                <div className="flex font-content justify-center items-center text-center">
                  <CalendarMonthSharpIcon className="mr-3" />
                  Months: <div className="font-number ml-5">{plan.months}</div>
                </div>
                <div className="flex font-content mt-3 justify-center items-center text-center">
                  <PaidSharpIcon className="mr-3" /> Price:
                  <div className="font-number ml-5">{plan.price} $</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
