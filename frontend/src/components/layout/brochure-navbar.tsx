import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router";


export default function BrochureNav() {
  return (
    // <AppBar position="static" color="primary" enableColorOnDark>
    <AppBar position="static" color="transparent" elevation={3}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ backgroundColor: "#ffffff", boxShadow: "none", height: 60}}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start"}}>
            TSoA
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <img src="/images/tsoa_logo_crop.png" alt="TSoA Logo" height={60} />
          </Box>

          {/* <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}> */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: ".5em"}}>
              <Button
                  sx={{ my: 2, color: "black", display: "block", background: "white",
                    borderRadius: 2, border: 1, borderColor: "black" }}
                  component={Link}
                  to={"app/login"}
                  >
                  Login
              </Button>
              <Button
                  sx={{ my: 2, color: "white", display: "block", background: "black",
                      borderRadius: 2, border: 1, borderColor: "white" }}
                  component={Link}
                  to={"app/register"}
                  >
                  Sign Up
              </Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
