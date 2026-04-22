import { Outlet } from "react-router";
import { Container, Stack, } from "@mui/material";
import ModularNav from "./components/layout/modular-navbar";

export default function AppBrochure() {
  return (
    <Stack sx={{ height: "100vh" }}>
        <ModularNav variant="brochure" />
        <Container component="main" sx={{ pt: 3 }}>
            <Outlet />
        </Container>

    </Stack>
  );
}
