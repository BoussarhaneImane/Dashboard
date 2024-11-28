import React from 'react';
import { FaSun, FaMoon, FaBell, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; 
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './topbar.css'; 

function Topbar() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className={`  topbar-container pl-4 font-medium ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-800    '}`}>
      <h1 className={`text-xl font-medium ${darkMode ? 'text-gray-50' : 'text-gray-950'}`}>
        Elit Shop - Tableau de Bord Administrateur
      </h1>

      <div className="topbar-buttons flex flex-row gap-4 items-center">
        {/* Dark Mode Toggle */}
        <motion.div 
          className="icon-container relative shadow-lg"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-3xl transition-colors flex items-center justify-center ${darkMode ? 'bg-gray-200' : 'bg-white text-gray-800'}`}
          >
            {darkMode ? <FaSun size={20} className={`${darkMode ? 'text-gray-700' : 'text-gray-800'}`} /> : <FaMoon size={20}
             />}
          </button>
        </motion.div>

        {/* Notification Icon */}
        <motion.div 
          className="icon-container relative shadow-lg"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <button className={`p-3 rounded-3xl transition-colors flex items-center justify-center ${darkMode ? 'bg-gray-200' : 'bg-white text-gray-800'}`}>
            <FaBell size={24} className={`${darkMode ? 'text-gray-700' : 'text-gray-800'}`} />
          </button>
          {/* Badge for notifications */}
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </motion.div>

        {/* Add Article Icon */}
        <motion.div 
          className="icon-container relative shadow-lg"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <button className={`p-3 rounded-3xl transition-colors flex items-center justify-center ${darkMode ? 'bg-gray-200' : 'bg-white text-gray-800'}`}>
            <FaPlusCircle size={24} className={`${darkMode ? 'text-gray-700' : 'text-gray-800'}`} />
          </button>
        </motion.div>

        {/* Delete Article Icon */}
        <motion.div 
          className="icon-container relative shadow-lg"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <button className={`p-3 rounded-3xl transition-colors flex items-center justify-center ${darkMode ? 'bg-gray-200' : 'bg-white text-gray-800'}`}>
            <FaTrashAlt size={24} className={`${darkMode ? 'text-gray-700' : 'text-gray-800'}`} />
          </button>
        </motion.div>

        {/* Logout Button */}
        <button
  onClick={handleLogout}
  className={`flex items-center px-4 py-2 font-medium rounded-3xl transition-colors duration-300 ease-in-out  shadow-lg
    ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
>
  <FaSignOutAlt className="mr-2" size={20} />
  Logout
</button>
      </div>
    </div>
  );
}

export default Topbar;
