import React from 'react';
import Topbar from './Topbar';
import { Box } from '@mui/material';
import { useTheme } from './ThemeContext';
import Sidebare from './Sidebare';
import Users from './Users';
import ProductTable from './ProductTable';

const UsersDashoard = () => {
  const { darkMode } = useTheme();

  return (
    <div className='font-medium'>
      <Box
        sx={{
          display: 'flex',
          bgcolor: darkMode ? 'background.default' : 'white',
          height: '100vh', // Ensure full height of the page
        }}
      >
        {/* Sidebar à gauche */}
        <Sidebare />

        {/* Contenu principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center content horizontally
            justifyContent: 'center', // Center content vertically
            p: 3,
            pt: '64px',
            bgcolor: darkMode ? 'background.paper' : 'white', // Apply different background for dark mode
          }}
        >
          <Topbar />
          <Users/>
          {/* Other dashboard content goes here */}
        </Box>
      </Box>
    </div>
  );
};

export default UsersDashoard;
