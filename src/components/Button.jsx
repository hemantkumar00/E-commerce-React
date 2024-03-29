import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  testColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${testColor}`}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
