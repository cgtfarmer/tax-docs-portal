import { Outlet } from "react-router";
import { Container, Stack, } from "@mui/material";
import ModularNav from "./modular-navbar";

export default function Component() {
  return (
    <Stack sx={{ height: "100vh" }}>
        <ModularNav variant="brochure" />
        <Container component="main" sx={{ pt: 3 }}>
            <Outlet />
        </Container>

    </Stack>
  );
}
