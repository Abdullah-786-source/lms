import React from "react";
import { Link, useLocation } from "react-router-dom";

const navbarItems = [
  { name: "Overview", path: "/dashboard" },
  { name: "Courses", path: "/courses" },
  { name: "Assignments", path: "/assignments" },
  { name: "Quizzes", path: "/quizzes" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-100 shadow px-6 py-2 flex gap-4">
      {navbarItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-3 py-1 rounded font-medium transition ${
            location.pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
