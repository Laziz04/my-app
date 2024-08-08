import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome className="h-6 w-6" />, path: "/" },
    { name: "Cost", icon: <FaHome className="h-6 w-6" />, path: "/cost" },
    {
      name: "Appliances",
      icon: <FaHome className="h-6 w-6" />,
      path: "/appliances",
    },
  ];

  return (
    <div className="bg-blue-900 text-white h-screen w-64 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">FUSiON SMART</h1>
        <p className="text-red-500">BETA</p>
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-2 mt-2 rounded-lg ${
              location.pathname === item.path
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}
          >
            {item.icon}
            <span className="ml-4">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
