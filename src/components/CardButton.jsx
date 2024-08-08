import React from "react";

const colorClasses = {
  red: "text-red-500 border-red-500 hover:bg-red-500 hover:text-white",
  blue: "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white",
  green: "text-green-500 border-green-500 hover:bg-green-500 hover:text-white",
  pistach: "text-pistach border-pistach hover:bg-pistach hover:text-white", // Custom color
  // Add more colors as needed
};

export default function CardButton({ onClick, label, Icon, color = "red" }) {
  const colorClass = colorClasses[color] || colorClasses.red; // Default to red if color is not found

  return (
    <button
      onClick={onClick}
      className={`border w-20 h-10 rounded-lg ${colorClass}`}
    >
      {label}
      {Icon && <Icon />}
    </button>
  );
}
