import React, { useState } from 'react';
import Topbar from './Topbar';
import { Box } from '@mui/material';
import { useTheme } from './ThemeContext';
import Sidebare from './Sidebare';


const AdminDashboard = () => {
  const { darkMode } = useTheme();

  return (
    <div className='font-medium'>
    <Box sx={{ display: 'flex', bgcolor: darkMode ? 'background.default' : 'white' }}>
      {/* Sidebar à gauche */}
      <Sidebare />

      {/* Contenu principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: '64px'}}>
        <Topbar />
        <center><h1 className='text-gray-900 '>Tableau de Bord Admin</h1></center>
        {/* Other dashboard content goes here */}
      </Box>
    </Box>
    </div>
  );
};

export default AdminDashboard;
