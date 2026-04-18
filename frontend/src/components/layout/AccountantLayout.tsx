import "../../App.css";
import { Outlet } from "react-router";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AccountantNavbarLeft from './AccountantNavbarLeft';

export default function Component() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AccountantNavbarLeft />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
