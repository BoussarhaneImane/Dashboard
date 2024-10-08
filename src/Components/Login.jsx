import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/admin');
    } catch (error) {
      console.error('Erreur de connexion', error);
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-xl  p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 dark:bg-gray-900 mb-8">
          Connexion
        </h2>
        <div className="mb-6">
          <label className="block mb-2 text-gray-800 dark:text-gray-200 dark:bg-gray-900 " htmlFor="email">
            Adresse e-mail
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email "
              required
              className="pl-10 w-full px-4 py-2 border text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-xs"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-800 dark:text-gray-200 dark:bg-gray-900" htmlFor="password">
            Mot de passe
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
              className="pl-10 w-full px-4 py-2 border  text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-xs"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-900 dark:text-gray-200 dark:bg-gray-700 text-white font-bold py-3 px-6  transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 "
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
