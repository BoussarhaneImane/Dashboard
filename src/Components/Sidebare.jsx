import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaCog, FaTshirt, FaShoppingCart, FaChartBar, FaPercent, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import img2 from './1.png'; 

function Sidebare() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
      )}

      <div className={`h-full lg:w-64 fixed top-0 left-0 flex flex-col p-4 transition-all duration-300 ease-in-out ${isOpen ? 'w-80' : 'w-16'} bg-gray-50     dark:bg-gray-800`}>
        <div className="relative flex items-center mb-4">
          <button 
            onClick={toggleSidebar} 
            className={`text-xl mr-4 focus:outline-none block lg:hidden ${isOpen ? 'hidden' : 'block'}`}
          >
            <FaBars />
          </button>
          {isOpen && (
            <button 
              onClick={toggleSidebar} 
              className="text-xl lg:hidden focus:outline-none"
            >
              <FaTimes />
            </button>
          )}
          <Link to='/' className="flex items-center">
            <div className={`text-2xl font-bold flex items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} lg:opacity-100`}>
              <img
                src={img2}
                alt="Shop Logo"
                className={`w-28 h-28 rounded-full shadow-lg border-2 bg-white border-white ${isOpen ? 'mr-2' : 'mr-0'}`}
              />
            </div>
          </Link>
        </div>

        <ul className={`flex-1 mt-6 space-y-2 ${isOpen ? 'block' : 'hidden'} lg:flex lg:flex-col lg:space-y-2`}>
          {[ 
            { to: "/", icon: <FaHome />, text: "Tableau de bord" },
            { to: "/products", icon: <FaTshirt />, text: "Produits" },
            { to: "/orders", icon: <FaShoppingCart />, text: "Commandes" },
            { to: "/clients", icon: <FaUser />, text: "Clients" },
            { to: "/statistics", icon: <FaChartBar />, text: "Statistiques" },
            { to: "/discounts", icon: <FaPercent />, text: "Promotions" },
            { to: "/newsletters", icon: <FaEnvelope />, text: "Newsletters" },
            { to: "/settings", icon: <FaCog />, text: "Paramètres" },
          ].map(({ to, icon, text }, index) => (
            <motion.li
              key={index}
              className={`flex items-center py-2 border-b border-gray-300 transition-colors duration-300 hover:bg-white dark:hover:bg-gray-600 hover:rounded-lg  pl-4  dark:text-gray-200  text-gray-950  `}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span>{icon}</span>
              <Link to={to} className='pl-4' >
                {text}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebare; 
