import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Box } from '@mui/material';
import { useTheme } from './ThemeContext';

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const { darkMode } = useTheme(); // Access dark mode from context

  return (
    <Box sx={{ display: 'flex', bgcolor: darkMode ? 'background.default' : 'white' }}>
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Topbar open={open} handleDrawerOpen={handleDrawerOpen} />
       <center>  <h1>Tableau de Bord Admin</h1> </center>
        {/* Other dashboard content goes here */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
