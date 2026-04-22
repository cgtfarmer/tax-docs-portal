import "../../App.css";
import { Outlet } from "react-router";
import AdminNavbarLeft from './AdminNavbarLeft';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function Component() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AdminNavbarLeft />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
