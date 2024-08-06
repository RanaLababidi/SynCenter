import React from "react";

export default function TaskInfo({ Icon, title, content }) {
  return (
    <div className="flex text-white ">
      {Icon && <Icon className="mr-1"  />}  
      <div className="mr-7">{title}</div>
      <div>{content}</div>
    </div>
  );
}
