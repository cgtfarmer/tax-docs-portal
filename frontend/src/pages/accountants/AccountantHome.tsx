import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Box, Paper, Typography } from "@mui/material";
import { useAuth } from "../../App";
import ApiAccessor from "../../accessors/api-accessor";
import { Client } from "../../models/client";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const apiAccessor = new ApiAccessor();

export default function AccountantHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== "ACCOUNTANT") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    async function fetchClients() {
      if (!user?.id) return;

      const result = await apiAccessor.getClientsByAccountant(user.id);
      setClients(result);
    }

    void fetchClients();
  }, [user]);

  const cardStyle = {
    flex: "0 0 300px",
    p: 3,
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minHeight: "160px",

    "&:hover": {
      backgroundColor: "#f2f2f2",
      transform: "translateY(-4px)",
      boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.firstName} {user.lastName}
      </Typography>

      <Box display="flex" gap={3} mt={3} flexWrap="wrap">
        {clients.map((client) => (
          <Paper
            key={client.id}
            sx={cardStyle}
            onClick={() =>
              navigate(`/app/accountant/clients/${client.id}`)
            }
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ mb: 1 }}>
                {client.firstName} {client.lastName}
              </Typography>
              <PersonIcon />
            </Box>

            <Typography variant="body2" color="text.secondary">
              View client account
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper
        sx={{
          mt: 4,
          p: 3,
          borderRadius: "12px",
          cursor: "pointer",
          width: "100%",
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: "#f2f2f2",
            transform: "translateY(-4px)",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
          },
        }}
        onClick={() => navigate("/app/accountant/account")}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ mb: 1 }}>
            My Account
          </Typography>
          <AccountCircleIcon />
        </Box>

        <Typography variant="body2" color="text.secondary">
          View and manage your accountant account
        </Typography>
      </Paper>
    </Box>
  );
}