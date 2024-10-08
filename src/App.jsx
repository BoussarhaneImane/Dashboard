import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import AdminDashboard from './Components/AdminDashboard';
import { ThemeProvider, useTheme } from './Components/ThemeContext';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <ThemeProvider>
      <Router>
        <div>
          <ThemeToggleButton />
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/admin" element={token ? <AdminDashboard /> : <Login setToken={setToken} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const ThemeToggleButton = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 m-4 bg-gray-200 dark:bg-gray-700 rounded"
    >
      {darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
    </button>
  );
};

export default App;
