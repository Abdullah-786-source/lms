import React, { useState } from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

const Topbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-3 sticky top-0 z-50">
      {/* Left: Search */}
      <div className="flex items-center gap-2 w-1/3">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative group">
          <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-blue-600 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1 animate-pulse">
            3
          </span>
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-sm">
            <p>New course assigned</p>
            <p>Quiz deadline approaching</p>
            <p>Module updated</p>
          </div>
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <FaUserCircle className="text-gray-600 text-2xl" />
            <span className="hidden md:inline text-gray-700 font-medium">Alice</span>
          </div>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded border border-gray-200 animate-fade-in">
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
