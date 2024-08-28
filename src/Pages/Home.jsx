import * as React from "react";
import { useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import landing from "../assets/landing.gif";
import employee from "../assets/employee.gif";
import client from "../assets/client.gif";
import meet from "../assets/meet.gif";
import tasks from "../assets/tasks.gif";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";

export default function Home() {
  const data = useRouteLoaderData("home");

  return (
    <div className="relative min-h-screen bg-cover bg-fixed bg-center bg-[url('./assets/aa.jpg')]">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 flex flex-col">
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-5 w-full flex flex-col">
            <div className="font-title text-white text-6xl mb-6 text-center">
              Stay Connected, Stay In Sync...
            </div>
            <div className="font-title text-white text-2xl">
              Welcome to The Sync Center System Streamline, your ultimate
              solution for managing all aspects of your company seamlessly. Our
              cutting-edge platform is designed to simplify and enhance the way
              you handle your business operations, ensuring you stay ahead in
              today's fast-paced market.
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <div className="w-60 h-40 rounded-3xl shadow-2xl backdrop-blur-xl p-5 text-white border border-white">
              <div className="text-white font-content justify-center content-center text-center">
                Manage your Projects <img src={landing} className="ml-5" />
              </div>
            </div>
            <div className="w-60 h-40 rounded-3xl shadow-2xl backdrop-blur-xl p-5 text-white border border-white">
              <div className="text-white font-content justify-center content-center text-center">
                Manage your Clients <img src={client} className="ml-5" />
              </div>
            </div>
            <div className="w-60 h-40 rounded-3xl shadow-2xl backdrop-blur-xl p-5 text-white border border-white">
              <div className="text-white font-content justify-center content-center text-center">
                Manage Employees <img src={employee} className="ml-5" />
              </div>
            </div>
            <div className="w-60 h-40 rounded-3xl shadow-2xl backdrop-blur-xl p-5 text-white border border-white">
              <div className="text-white font-content justify-center content-center text-center">
                Manage All Tasks <img src={tasks} className="ml-5" />
              </div>
            </div>
            <div className="w-60 h-40 rounded-3xl shadow-2xl backdrop-blur-xl text-white border border-white">
              <div className="text-white font-content justify-center content-center text-center">
                Manage Meetings <img src={meet} className="ml-10" />
              </div>
            </div>
          </div>
          <div className="text-center mt-5 font-title font-bold text-white text-3xl">
            Interested? Choose one of our plans to subscribe now.
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 rounded-full">
            {data.map((plan) => (
               <Link to={`${plan.id}`} key={plan.id}>
              <div
                key={plan.id}
                className="w-80 h-40 ml-8 rounded-full shadow-2xl backdrop-blur-xl p-5 text-white border border-white focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6 hover:border-pistach"
              >
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
              </Link>
            ))}
          </div>
          
         <div className="text-center j mt-5 font-title font-bold text-white text-3xl hover:text-pistach" >
         <Link to={'/auth'} >
            Already Have Account?
          </Link>
         </div>
        </div>
      </div>
    </div>
  );
}
