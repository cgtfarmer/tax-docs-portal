import "./App.css";
import { Outlet } from "react-router";
import { Box, Stack } from "@mui/material";

export default function AppLoggedIn() {
  return (
    <Stack sx={{ height: "100vh" }}>
        {/*Logged In Navbar*/}
        <Box component="main" sx={{ margin:0, padding:0, }}>
            <Outlet />
        </Box>

    </Stack>
  );
}
