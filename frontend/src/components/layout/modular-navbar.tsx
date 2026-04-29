import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { Link, useParams, useLocation, useNavigate } from "react-router";

import { useEffect, useState } from "react";

import { useAuth } from "../../App";
import ApiAccessor from "../../accessors/api-accessor";
import { Client } from "../../models/client";

const apiAccessor = new ApiAccessor();

const drawerWidth = 240;

interface NavPage {
  readonly name: string;
  readonly path: string;
}

export type NavVariant = "brochure" | "login" | "client" | "accountant" | "admin";

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
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ],

  login: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ],

  client: [
    { name: "Home", path: "/app/client" },
    { name: "Messages", path: "/app/client/messages" },
    { name: "Tasks", path: "/app/client/tasks" },
    { name: "Documents", path: "/app/client/documents" },
  ],

  accountant: [
    { name: "Home", path: "/app/accountant" },
    { name: "View Clients", path: "/app/accountant/clients" },
  ],

  admin: [
    { name: "Home", path: "/admin" },
    { name: "Accountants", path: "/admin/accountants" },
    { name: "Clients", path: "/admin/clients" },
    { name: "Admins", path: "/admin/admins" },
  ],
};

export default function ModularNav({ variant }: { variant: NavVariant }) {
  const { clientId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [assignedClients, setAssignedClients] = useState<Client[]>([]);

  useEffect(() => {
    async function loadClients() {
      if (user?.role !== "ACCOUNTANT" || !user.id) {
        return;
      }

      const result = await apiAccessor.getClientsByAccountant(user.id);
      setAssignedClients(result);
    }

    void loadClients();
  }, [user]);

  let pages = navLinks[variant];

  if (variant === "accountant" && clientId) {
    pages = [
      { name: "Back To Clients", path: "/app/accountant/clients" },
      { name: "Client Home", path: `/app/accountant/clients/${clientId}` },
      { name: "Messages", path: `/app/accountant/clients/${clientId}/messages` },
      { name: "View Tasks", path: `/app/accountant/clients/${clientId}/tasks` },
      { name: "Documents", path: `/app/accountant/clients/${clientId}/documents` },
    ];
  }

  const handleLogout = (): void => {
    logout();
    void navigate("/");
  };


  const handleLogoClick = () => {
    switch (variant) {
      case "brochure":
        navigate("/");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "client":
        navigate("/app/client");
        break;
      case "accountant":
        navigate("/app/accountant");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
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
          onClick={handleLogoClick}
          style={{
            maxWidth: "100%",
            height: "60px",
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
      </Box>

      <Divider />

      {user && (
        <Box
          sx={{
            px: 2,
            py: 1,
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {user.firstName} {user.lastName}
          <br />
          {user.role}
        </Box>
      )}

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

              ...(location.pathname === page.path && {
                fontWeight: "bold",
                backgroundColor: "#f2f2f2",
              }),
            }}
          >
            {page.name}
          </Button>
        ))}

        {variant === "accountant" && !clientId && assignedClients.length > 0 && (
          <>
            <Divider />

            {assignedClients.map((client) => (
              <Button
                key={client.id}
                component={Link}
                to={`/app/accountant/clients/${client.id ?? ""}`}
                fullWidth
                sx={{
                  color: "black",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  px: 2,
                }}
              >
                {client.firstName} {client.lastName}
              </Button>
            ))}
          </>
        )}
      </Box>

      <Box
        sx={{
          mt: "auto",
          px: 2,
          py: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Divider />

        {bottomAction[variant] === "login" && (
          <Button
            component={Link}
            to="/login"
            fullWidth
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              px: 2,
            }}
          >
            Login
          </Button>
        )}

        {bottomAction[variant] === "account-logout" && (
          <>
            <Button
              component={Link}
              to={
                variant === "client"
                  ? "/app/client/account"
                  : variant === "accountant"
                  ? "/app/accountant/account"
                  : `/admin/admins/${user?.id ?? ""}`
              }
              fullWidth
              sx={{
                color: "black",
                justifyContent: "flex-start",
                textAlign: "left",
                px: 2,
              }}
            >
              Account
            </Button>

            <Button
              onClick={handleLogout}
              fullWidth
              sx={{
                color: "black",
                justifyContent: "flex-start",
                textAlign: "left",
                px: 2,
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}