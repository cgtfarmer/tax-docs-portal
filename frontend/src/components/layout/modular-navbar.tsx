import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import { Link } from "react-router";

interface NavPage {
  readonly name: string;
  readonly path: string;
}



type NavVariant = "brochure" | "login" | "client" | "accountant" | "admin" ;

const navLinks: Record<NavVariant, NavPage[]> = {
  brochure: [
    { name: "Login", path: "/admin/home" },
  ],
  login: [
    { name: "Brochure", path: "/admin/home" },
  ],
  client: [
    { name: "Home", path: "/client/home" },
    { name: "Messages", path: "/client/messages" },
    { name: "Tasks", path: "/client/tasks" },
    { name: "Account", path: "/client/account" },
  ],
  accountant: [
    { name: "Home", path: "/accountant/home" },
    { name: "View Clients", path: "/accountant/view-clients" },
    { name: "Account", path: "/accountant/account" },
  ],
  admin: [
    { name: "Home", path: "/admin/home" },
    { name: "View Accountants", path: "/admin/view-all-accountants" },
    { name: "View Clients", path: "/admin/view-all-clients" },
    { name: "Account", path: "/admin/account" },
  ],
};


export default function ModularNav({ variant }: { variant: NavVariant }) {
  const pages = navLinks[variant];

  return (
    <AppBar position="static" color="transparent" elevation={3}>
      <Box sx={{ px: 1, }}>
        <Toolbar disableGutters sx={{ backgroundColor: "#ffffff", height: 60 }}>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            TSoA
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <img src="/images/tsoa_logo_crop.png" alt="TSoA Logo" height={60} />
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{
                color: "black",

                ...(variant === "brochure" && page.name === "Login" && {
                  border: "1px solid black",
                  px: 3,
                  backgroundColor: "transparent",
                }),
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Box>
    </AppBar>
  );
}
