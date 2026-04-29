import "../../App.css";
import { Outlet } from "react-router";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
//import AccountantNavbarLeft from './AccountantNavbarLeft';
import ModularNav, { NavVariant } from "./modular-navbar";
import { useAuth } from '../../App';
// import { Button } from '@mui/material';

console.log('123 ---------------------- 123 ');

export default function Component() {
  const { user } = useAuth();

  const role = user?.role.toLowerCase();

  const variantSelection = role ? role as NavVariant : undefined;

  const navSelection = variantSelection
    ?  <ModularNav variant={variantSelection} />
    : null;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {navSelection}

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
