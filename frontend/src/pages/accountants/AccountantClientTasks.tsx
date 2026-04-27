import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import ApiAccessor from "../../accessors/api-accessor";
import { useAuth } from "../../App";
import { Client } from "../../models/client";

const apiAccessor =
  new ApiAccessor();

export default function AccountantCreateTaskPage() {
  const { user } =
    useAuth();

  const [clients, setClients] =
    useState<Client[]>([]);

  const [clientId, setClientId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    void loadClients();
  }, []);

  const loadClients =
    async (): Promise<void> => {
      try {
        if (!user?.id) {
          return;
        }

        const result =
          await apiAccessor.getClientsByAccountant(
            user.id
          );

        setClients(result);
      }
      catch (error) {
        console.error(error);
      }
    };

  const handleCreateTask =
    async (): Promise<void> => {
      try {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        if (!user?.id) {
          setErrorMessage(
            "No accountant logged in."
          );

          return;
        }

        if (
          !clientId ||
          !title ||
          !description
        ) {
          setErrorMessage(
            "Please complete all fields."
          );

          return;
        }

        await apiAccessor.createTask({
          id: "",
          clientId: clientId,
          accountantId: user.id,
          title: title,
          task_description:
            description,
          task_status: "In Progress",
          created_at:
            new Date().toISOString(),
          updated_at: null,
          deleted_at: null
        });

        setSuccessMessage(
          "Task created successfully."
        );

        setClientId("");
        setTitle("");
        setDescription("");
      }
      catch (error) {
        console.error(error);

        setErrorMessage(
          "Unable to create task."
        );
      }
      finally {
        setLoading(false);
      }
    };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4 }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4 }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Create Client Task
          </Typography>

          <Typography
            variant="body2"
          >
            Assign a task to one of
            your clients.
          </Typography>

          <TextField
            select
            label="Select Client"
            value={clientId}
            onChange={(e) =>
              setClientId(
                e.target.value
              )
            }
            fullWidth
          >
            {clients.map(
              (client) => (
                <MenuItem
                  key={
                    client.id
                  }
                  value={
                    client.id
                  }
                >
                  {
                    client.firstName
                  }{" "}
                  {
                    client.lastName
                  }
                </MenuItem>
              )
            )}
          </TextField>

          <TextField
            label="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            multiline
            minRows={4}
            fullWidth
          />

          <Box>
            <Typography
              variant="body2"
            >
              Date Created:{" "}
              {new Date().toLocaleDateString()}
            </Typography>
          </Box>

          {successMessage && (
            <Typography
              color="success.main"
            >
              {
                successMessage
              }
            </Typography>
          )}

          {errorMessage && (
            <Typography
              color="error.main"
            >
              {
                errorMessage
              }
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={() =>
              void handleCreateTask()
            }
            disabled={
              loading
            }
          >
            {loading
              ? "Creating..."
              : "Create Task"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}