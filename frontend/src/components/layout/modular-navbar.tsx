import Box from "@mui/material/Box";
//import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
//import Typography from "@mui/material/Typography";
import { Link } from "react-router";

const drawerWidth = 240;

interface NavPage {
  readonly name: string;
  readonly path: string;
}

type NavVariant =
  | "brochure"
  | "login"
  | "client"
  | "accountant"
  | "admin";

const navLinks: Record<NavVariant, NavPage[]> = {
  brochure: [
    { name: "Login", path: "/login" },
  ],

  login: [
    { name: "Home", path: "/" },
  ],

  client: [
    { name: "Home", path: "/client" },
    { name: "Messages", path: "/client/messages" },
    { name: "Tasks", path: "/client/tasks" },
    { name: "Account", path: "/client/account" },
  ],

  accountant: [
    { name: "Home", path: "/accountant/" },
    { name: "View Clients", path: "/accountant/clients/" },
    { name: "Account", path: "/accountant/account" },
  ],

  admin: [
    { name: "Home", path: "/admin" },
    { name: "View Accountants", path: "/admin/accountants" },
    { name: "View Clients", path: "/admin/clients" },
    { name: "Account", path: "/admin/" },
  ],
};

export default function ModularNav({
  variant,
}: {
  variant: NavVariant;
}) {
  const pages = navLinks[variant];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
        },
      }}
    >
      {/*<Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          TSoA
        </Typography>
      </Toolbar>*/}

      <Box
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        
        <img
          src="/images/tsoa_logo_crop.png"
          alt="TSoA Logo"
          style={{
            maxWidth: "100%",
            height: "60px",
            objectFit: "contain",
          }}
        />
      </Box>
        
      <Divider />

      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {pages.map((page) => (
          <Button
            key={page.name}
            component={Link}
            to={page.path}
            fullWidth
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              px: 2,

              ...(variant === "brochure" &&
                page.name === "Login" && {
                  border: "1px solid black",
                  backgroundColor: "transparent",
                }),
            }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </Drawer>
  );
}