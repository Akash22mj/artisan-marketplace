import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: 3, marginTop: 'auto' }}>
      <Typography variant="body1" align="center">
        © 2023 Artisan Marketplace. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;