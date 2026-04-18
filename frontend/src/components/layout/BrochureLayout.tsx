import { Outlet } from "react-router";
import { Container, Stack, } from "@mui/material";
// import Footer from './components/layout/footer';
import BrochureNav from "./BrochureNavbar";

export default function Component() {
  return (
    <Stack sx={{ height: "100vh" }}>
        <BrochureNav />

        <Container component="main" sx={{ pt: 3 }}>
            <Outlet />
        </Container>

    </Stack>
  );
}
