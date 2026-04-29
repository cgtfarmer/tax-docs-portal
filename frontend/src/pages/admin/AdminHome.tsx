import { Box, Container, Paper, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../App";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Page() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  const cardStyle = {
    flex: "1 1 300px",
    p: 3,
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minHeight: "180px",

    "&:hover": {
      backgroundColor: "#f2f2f2",
      transform: "translateY(-4px)",
      boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
    },
  };

  return (
    <Container className="mt-3">
      <Typography variant="h4" gutterBottom>
        Admin Home
      </Typography>

      <Box display="flex" gap={3} mt={4} flexWrap="wrap">
        <Paper sx={cardStyle} onClick={() => navigate("/admin/accountants")}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ mb: 1 }}>
              Accountants
            </Typography>
            <GroupsIcon />
          </Box>

          <Typography variant="body2" color="text.secondary">
            View and manage all accountant accounts
          </Typography>
        </Paper>

        <Paper sx={cardStyle} onClick={() => navigate("/admin/clients")}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ mb: 1 }}>
              Clients
            </Typography>
            <GroupsIcon />
          </Box>

          <Typography variant="body2" color="text.secondary">
            View and manage all client accounts
          </Typography>
        </Paper>

        <Paper sx={cardStyle} onClick={() => navigate("/admin/admins")}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ mb: 1 }}>
              Admins
            </Typography>
            <AdminPanelSettingsIcon />
          </Box>

          <Typography variant="body2" color="text.secondary">
            View and manage all admin accounts
          </Typography>
        </Paper>

        <Paper sx={cardStyle} onClick={() => navigate(`/admin/admins/${user.id}`)}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ mb: 1 }}>
              My Account
            </Typography>
            <AccountCircleIcon />
          </Box>

          <Typography variant="body2" color="text.secondary">
            View and manage your admin account
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}