import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const { data } = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);

      // Simulate a short delay after login before showing success message
      setTimeout(() => {
        setIsLoading(false); // Stop loading after the delay
        toast.success('Connexion réussie !', {
          position: 'top-right',
          autoClose: 3000, // Adjust the auto-close duration if needed
        });
        navigate('/admin'); // Navigate after toast success
      }, 2000); // 2-second delay before success message

    } catch (error) {
      setIsLoading(false); // Stop loading on error
      toast.error("Nom d'utilisateur ou mot de passe incorrect", {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-medium dark:bg-slate-950">
      {/* Toast Container to display notifications */}
      <ToastContainer />

      {/* Display spinner while loading */}
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden dark:text-gray-300">.</span>
          </div>
          <p className="mt-2 text-gray-500 dark:text-gray-200">Connexion en cours...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 shadow-lg p-8 max-w-md w-full font-medium border border-black"
        >
          <h2 className="text-3xl font-medium text-center text-gray-800 dark:text-gray-200 dark:bg-gray-900 mb-8">
            Connexion
          </h2>
          <div className="mb-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 dark:bg-gray-900 mb-2" htmlFor="email">
              Adresse e-mail
            </label>
            <div className="relative ">
              <FaEnvelope className="absolute left-3 top-3 text-gray-950 dark:text-gray-900 bg-gray-100" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email "
                required
                className="pl-12 w-full text-xs px-4 py-3 border text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-xs italic"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 dark:bg-gray-900 mb-2" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-950 dark:text-gray-900 bg-gray-100" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
                className="pl-10 w-full px-4 py-3 border text-xs text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-xs italic"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 dark:text-gray-200 dark:bg-gray-700 text-white py-3 px-6 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 font-medium"
          >
            Se connecter
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
