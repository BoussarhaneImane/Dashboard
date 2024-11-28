import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './ThemeContext'; // Assuming ThemeContext is in the same directory

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [formVisible, setFormVisible] = useState(false); // State to control form visibility
  const { darkMode } = useTheme(); // Get dark mode state from context

  // Custom toast options for dark and light mode
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: darkMode ? 'dark' : 'light' // Adjust toast theme based on darkMode
  };

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Erreur lors de la récupération des utilisateurs.', toastOptions);
      }
    };
    fetchUsers();
  }, [darkMode]);

  // Handle user form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await axios.put(`http://localhost:5000/users/${editingUserId}`, { name, email, password });
        toast.success('Utilisateur modifié avec succès.', toastOptions);
      } else {
        await axios.post('http://localhost:5000/register', { name, email, password });
        toast.success('Utilisateur créé avec succès.', toastOptions);
      }
      const updatedUsers = await axios.get('http://localhost:5000/users');
      setUsers(updatedUsers.data); // Refresh user list
      resetForm(); // Reset the form after successful submission
      setFormVisible(false); // Hide form after submission
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erreur lors de la création ou de la modification de l'utilisateur.", toastOptions);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setEditingUserId(null);
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPassword(''); // Don't pre-fill the password
    setEditingUserId(user._id);
    setFormVisible(true); // Show form for editing
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success('Utilisateur supprimé avec succès.', toastOptions);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error("Erreur lors de la suppression de l'utilisateur.", toastOptions);
    }
  };

  return (
    <div className="lg:ml-52 mt-16 p-12 items-center justify-center min-h-screen font-medium dark:bg-slate-950">
      <ToastContainer />
      <h2 className={`text-2xl pb-9 pt-8 font-bold  tracking-wide mb-6 underline ${darkMode ? 'decoration-gray-300 text-gray-300' : 'decoration-black'} decoration-4 underline-offset-4`}>
        Gestion des Utilisateurs
      </h2>

      {/* Button to show the form */}
      {!formVisible && (
        <button
          onClick={() => setFormVisible(true)}
          className={`font-bold rounded p-2  ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-950 text-white'}`}
        >
          Ajouter Utilisateur
        </button>
      )}

      {/* Background overlay when form is visible */}
      {formVisible && (
        <div className="fixed inset-0 bg-black   bg-opacity-50 flex items-center justify-center" style={{marginLeft:'16rem'}}>
          <form onSubmit={handleSubmit} className={`relative z-10 w-96 mb-12 p-4 shadow-lg ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`} style={{ fontSize: '0.9rem' }}>
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom"
                required
                className={`w-full rounded p-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} font-medium`}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className={`w-full rounded p-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} font-medium`}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required={!editingUserId}
                className={`w-full rounded p-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} font-medium`}
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className={`w-full font-bold p-2 rounded ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-950 text-white'}`}
              >
                {editingUserId ? "Modifier l'Utilisateur" : "Ajouter l'Utilisateur"}
              </button>
              <button
                onClick={() => setFormVisible(false)}
                type="button"
                className="ml-4 p-2 text-red-500"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users table */}
      <table className={`font-medium text-left table-auto shadow-lg mt-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} style={{ fontSize: '0.99rem', width: '65rem' }}>
        <thead>
          <tr className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-950 text-white'}`}>
            <th className="px-4 py-2 font-medium">Nom</th>
            <th className="px-4 py-2 font-medium">Email</th>
            <th className="px-4 py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-500 cursor-pointer' : 'border-gray-200 hover:bg-gray-50 cursor-pointer'}`}>
              <td className="px-4 py-2 font-medium">{user.name}</td>
              <td className="px-4 py-2 font-medium">{user.email}</td>
              <td className="px-4 py-2 flex items-center space-x-4">
                <button onClick={() => handleEdit(user)} className="text-yellow-400">
                  <FaEdit size={20} />
                </button>
                <button onClick={() => handleDelete(user._id)} className="text-red-500">
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
