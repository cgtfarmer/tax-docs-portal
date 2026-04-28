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

type BottomAction = "login" | "account-logout" | "none";
const bottomAction: Record<NavVariant, BottomAction> = {
  brochure: "login",
  login: "none",
  client: "account-logout",
  accountant: "account-logout",
  admin: "account-logout",
};

const navLinks: Record<NavVariant, NavPage[]> = {
  brochure: [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ],

  login: [
    { name: "Home", path: "/" },
  ],

  client: [
    { name: "Home", path: "/client/" },
    { name: "Messages", path: "/client/messages" },
    { name: "Tasks", path: "/client/tasks" },
    // { name: "Account", path: "/client/account" },
  ],

  accountant: [
    { name: "Home", path: "/app/accountant/" },
    { name: "View Clients", path: "/app/accountant/clients/" },
  ],

  admin: [
    { name: "Home", path: "/admin/" },
    { name: "View Accountants", path: "/admin/accountants" },
    { name: "View Clients", path: "/admin/clients" },
    { name: "View Admins", path: "/admin/admins" },
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        backgroundColor: "blue",
        
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          minHeight: "100vh",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
        },
      }}
    >
    
    {/* top logo */}
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

    {/* page specific navLinks */}
      <Box
        sx={{
          px: 2,
          py: 1,
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
            }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
      
      <Divider />
      

      {/* bottom navbar actions */}
        {bottomAction[variant] === "login" && (
          <Box
          sx={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifySelf: "flex-end",
            mt: "auto",
            px: 2,
            py: 1,
            gap: 1,
          }}
        >
          <Divider sx={{ mx: -2 }} />
          <Button 
          component={Link} 
          to="/login" 
          fullWidth
          sx={{
            justifyContent: "flex-start",
            textAlign: "left",
            px: 2,
          }}
          >
            Login
          </Button>
        </Box>
        )}

        {bottomAction[variant] === "account-logout" && (
          <Box
            sx={{
              color: "black",
              display: "flex",
              flexDirection: "column",
              justifySelf: "flex-end",
              mt: "auto",
              px: 2,
              py: 1,
              gap: 1,
            }}
          >
          <Divider sx={{ mx: -2 }} />
          <Button
          component={Link}
          to={variant === "accountant" ? "/app/accountant/account" : `/${variant}/account`}
          fullWidth
          sx={{
            justifyContent: "flex-start",
            textAlign: "left",
            px: 2,
          }}
        >
            Account
          </Button>

            <Divider sx={{ mx: -2 }} />

            <Button 
            fullWidth 
            sx={{
              justifyContent: "flex-start",
              textAlign: "left",
              px: 2,
            }}
            component={Link} 
            to={`/`} 
            // onClick={() => { /* logout logic */ }}
            >
              Logout
            </Button>
          </Box>
        )}


    </Drawer>
  );
}
