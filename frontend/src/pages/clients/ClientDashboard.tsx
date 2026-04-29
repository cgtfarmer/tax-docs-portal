import {
  Stack,
  Container,
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import ApiAccessor from "../../accessors/api-accessor";
import { useAuth } from "../../App";
import { Accountant } from "../../models/accountant";
import { Task } from "../../models/task";

const apiAccessor = new ApiAccessor();

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [accountant, setAccountant] = useState<Accountant | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setErrorMessage("");

        if (!user?.id) return;

        const client = await apiAccessor.getClient(user.id);

        if (client.accountantId) {
          const accountantResult = await apiAccessor.getAccountant(client.accountantId);
          setAccountant(accountantResult);
        }

        const taskResult = await apiAccessor.getActiveTasksByClient(user.id);
        setTasks(taskResult);
      } catch {
        setErrorMessage("Unable to load client dashboard.");
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, [user]);

  return (
    <Stack sx={{ height: "100vh" }}>
      <Container component="main" sx={{ pt: 3, height: "100%" }}>
        <Box sx={{ display: "flex", gap: 3, height: "100%" }}>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">
                Your Accountant:{" "}
                {accountant
                  ? `${accountant.firstName ?? ""} ${accountant.lastName ?? ""}`
                  : "Not assigned"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {accountant?.email ?? "No accountant email available"}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                not satisfied with your accountant? contact STAbill
              </Typography>

              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => navigate("/app/client/messages")}
              >
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

              {loading && <CircularProgress />}

              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}

              {!loading && tasks.length === 0 && (
                <Typography color="text.secondary">
                  No active tasks assigned.
                </Typography>
              )}

              {!loading &&
                tasks.map((task) => (
                  <Paper key={task.id} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">
                      {task.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {task.taskStatus}
                    </Typography>

                    {task.description && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {task.description}
                      </Typography>
                    )}

                    <Button
                      variant="outlined"
                      sx={{ mt: 1 }}
                      onClick={() => navigate("/app/client/tasks")}
                    >
                      View Task
                    </Button>
                  </Paper>
                ))}
            </Paper>
          </Box>
        </Box>
      </Container>

      <Outlet />
    </Stack>
  );
}