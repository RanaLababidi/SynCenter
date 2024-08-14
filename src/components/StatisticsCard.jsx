import React, { useState } from "react";

export default function StatisticsCard({ Icon, title, content, disc }) {
  return (
    <div className="bg-gray mt-1 block w-full   rounded-2xl  shadow-sm focus:ring-2 focus:ring-inset ">
      <div className="p-5 space-y-3">
        <div className="flex">
          <Icon className={`w-10 h-10 text-shade`} />
          <div className="text-shade ml-4">{title}</div>
        </div>
        <div className="text-white font-number text-4xl">{content}</div>
        <div className="text-shade font-content ">{disc}</div>
      </div>
    </div>
  );
}
