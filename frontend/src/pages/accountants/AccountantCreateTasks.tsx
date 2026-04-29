import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import {
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router";

import ApiAccessor from "../../accessors/api-accessor";
import { useAuth } from "../../App";

const apiAccessor =
  new ApiAccessor();

export default function AccountantCreateTasks() {
  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  const { clientId } =
    useParams();

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

        if (!clientId) {
          setErrorMessage(
            "No client selected."
          );

          return;
        }

        if (
          !title.trim() ||
          !description.trim()
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
          title: title.trim(),
          description:
            description.trim(),
          taskStatus:
            "In Progress",
          createdAt:
            new Date().toISOString(),
          updatedAt: null,
          deletedAt: null
        });

        setSuccessMessage(
          "Task created successfully."
        );

        setTimeout(() => {
          navigate(
            `/app/accountant/clients/${clientId}/tasks`
          );
        }, 700);
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
            color="text.secondary"
          >
            Create a new task
            for the selected
            client.
          </Typography>

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
            minRows={5}
            fullWidth
          />

          <Box>
            <Typography
              variant="body2"
            >
              Date Created:
              {" "}
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
            disabled={
              loading
            }
            onClick={() =>
              void handleCreateTask()
            }
          >
            {loading
              ? "Creating..."
              : "Create Task"}
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                `/app/accountant/clients/${clientId}/tasks`
              )
            }
          >
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}