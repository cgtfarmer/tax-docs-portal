import { Stack, Container, Box, Typography, Button, Paper } from "@mui/material";
import { Outlet } from "react-router";


export default function ClientDashboard() {
  return (
    <Stack sx={{ height: "100vh" }}>

      <Container component="main" sx={{ pt: 3, height: "100%" }}>

        <Box sx={{ display: "flex", gap: 3, height: "100%" }}>

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">
                Your Accountant : Mary Jane
              </Typography>

              <Typography variant="body2" color="text.secondary">
                company - email - phone ?
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                not satisfied with your accountant? contact STAbill
              </Typography>

              <Button variant="outlined" sx={{ mt: 1 }}>
                Schedule Meeting
              </Button>
            </Paper>

            <Paper sx={{ flex: 1 }} />

          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 2, height: "100%" }}>

              <Typography variant="h6" sx={{ mb: 2 }}>
                Your Tasks:
              </Typography>

              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1">
                  upload W4
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  in review
                </Typography>

                <Button variant="outlined" sx={{ mt: 1 }}>
                  attach file
                </Button>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                  upload Last Year’s Tax return
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  completed
                </Typography>

                <Button variant="outlined" sx={{ mt: 1 }}>
                  view file
                </Button>
              </Paper>

            </Paper>
          </Box>

        </Box>

      </Container>
      <Outlet />
    </Stack>

  );
}
