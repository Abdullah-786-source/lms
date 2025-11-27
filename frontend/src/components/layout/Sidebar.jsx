import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaQuestionCircle,
  FaComments,
  FaBullhorn,
  FaFileAlt,
  FaVideo,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaList,
  FaUsers
} from "react-icons/fa";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  { 
    name: "Courses", 
    path: "/courses", 
    icon: <FaBook />,
    subMenu: [
      { name: "My Courses", path: "/courses/my-courses", icon: <FaUsers /> },
      { name: "All Courses", path: "/courses/all-courses", icon: <FaList /> }
    ]
  },
  { 
    name: "Modules", 
    path: "/modules", 
    icon: <FaClipboardList />,
    subMenu: [
      { name: "Active Modules", path: "/modules/active", icon: <FaFileAlt /> },
      { name: "Archived Modules", path: "/modules/archived", icon: <FaFileAlt /> }
    ]
  },
  { name: "Assignments", path: "/assignments", icon: <FaFileAlt /> },
  { name: "Quizzes", path: "/quizzes", icon: <FaQuestionCircle /> },
  { name: "Discussions", path: "/discussions", icon: <FaComments /> },
  { name: "Announcements", path: "/announcements", icon: <FaBullhorn /> },
  { name: "Submissions", path: "/submissions", icon: <FaFileAlt /> },
  { name: "Videos", path: "/videos", icon: <FaVideo /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // Automatically open parent menu if a submenu is active
  useEffect(() => {
    const activeParent = navItems.find(
      (item) => item.subMenu && item.subMenu.some(sub => sub.path === location.pathname)
    );
    if (activeParent) {
      setOpenSubMenu(activeParent.name);
    }
  }, [location.pathname]);

  const toggleSubMenu = (name) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  return (
    <aside
      className={`flex flex-col h-screen bg-gray-900 text-gray-100 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <span className="text-2xl font-bold">LMS Portal</span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-200 hover:text-white text-xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col mt-4 gap-2">
        {navItems.map((item) => {
          const isActiveParent =
            location.pathname === item.path ||
            (item.subMenu && item.subMenu.some(sub => sub.path === location.pathname));

          return (
            <div key={item.path}>
              <button
                onClick={() => item.subMenu && toggleSubMenu(item.name)}
                className={`flex items-center justify-between w-full gap-4 px-4 py-3 rounded hover:bg-gray-700 transition ${
                  isActiveParent ? "bg-blue-600 text-white font-semibold" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-lg">{item.icon}</div>
                  {isOpen && <span>{item.name}</span>}
                </div>
                {item.subMenu && isOpen && (
                  <div className="text-sm">
                    {openSubMenu === item.name ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.subMenu && openSubMenu === item.name && (
                <div className="flex flex-col ml-12 mt-1 gap-1">
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition ${
                        location.pathname === sub.path ? "bg-blue-500 text-white font-medium" : ""
                      }`}
                    >
                      {sub.icon && <div className="text-sm">{sub.icon}</div>}
                      {isOpen && sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-gray-700 text-gray-400 text-sm">
          © 2025 LMS Portal
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
