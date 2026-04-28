import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import {
  Link as RouterLink,
  useParams
} from "react-router";

import DescriptionIcon from "@mui/icons-material/Description";

import ApiAccessor from "../../accessors/api-accessor";
import { Task } from "../../models/task";
import { useAuth } from "../../App";
import { ClientDocument } from "../../models/document";

const apiAccessor =
  new ApiAccessor();

export default function AccountantClientTasks() {
  const { user } =
    useAuth();

  const { clientId } =
    useParams();

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage
  ] = useState("");

  useEffect(() => {
    void loadTasks();
  }, [clientId]);

  const loadTasks =
    async (): Promise<void> => {
      try {
        setLoading(true);
        setErrorMessage("");

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

        const result =
          await apiAccessor.getActiveTasksByClient(
            clientId
          );

        setTasks(result);
      } catch (error) {
        console.error(error);

        setErrorMessage(
          "Unable to load tasks."
        );
      } finally {
        setLoading(false);
      }
    };

  const getDocumentType = (
    title: string
  ): string => {
    const value =
      title.toLowerCase();

    if (
      value.includes("w4")
    ) {
      return "w4";
    }

    if (
      value.includes("1099")
    ) {
      return "1099";
    }

    if (
      value.includes(
        "financial"
      )
    ) {
      return "financial statement";
    }

    return "tax forms";
  };

  const handleDownload =
    async (
      task: Task
    ): Promise<void> => {
      try {
        if (!clientId) {
          return;
        }

        setErrorMessage("");

        const clientDocument: ClientDocument =
          await apiAccessor.getClientDocument(
            clientId,
            getDocumentType(
              task.title
            )
          );

        if (
          !clientDocument.id
        ) {
          setErrorMessage(
            "Document not found."
          );
          return;
        }

        const blob =
          await apiAccessor.downloadDocument(
            clientDocument.id
          );

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          window.document.createElement(
            "a"
          );

        link.href = url;

        link.download =
          clientDocument.storageKey ??
          "downloaded-file";

        window.document.body.appendChild(
          link
        );

        link.click();
        link.remove();

        window.URL.revokeObjectURL(
          url
        );
      } catch (error) {
        console.error(error);

        setErrorMessage(
          "Unable to download file."
        );
      }
    };

  const markCompleted =
    async (
      task: Task
    ): Promise<void> => {
      try {
        setErrorMessage("");

        await apiAccessor.updateTask({
          ...task,
          taskStatus:
            "Completed",
          updatedAt:
            new Date().toISOString()
        });

        await loadTasks();
      } catch (error) {
        console.error(error);

        setErrorMessage(
          "Unable to update task."
        );
      }
    };

  const getStatusColor =
    (
      status: string
    ):
      | "default"
      | "warning"
      | "success"
      | "info" => {
      if (
        status ===
        "In Review"
      ) {
        return "warning";
      }

      if (
        status ===
        "Completed"
      ) {
        return "success";
      }

      return "info";
    };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4 }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Client Tasks
          </Typography>

          <Typography
            variant="body2"
          >
            View all active
            tasks assigned
            to this client.
          </Typography>
        </Box>

        <Button
          component={
            RouterLink
          }
          to={`/app/accountant/clients/${clientId}/tasks/create`}
          variant="contained"
          sx={{
            width: "220px"
          }}
        >
          Create New Task
        </Button>

        {loading && (
          <Box>
            <CircularProgress />
          </Box>
        )}

        {errorMessage && (
          <Typography
            color="error"
          >
            {errorMessage}
          </Typography>
        )}

        {!loading &&
          !errorMessage &&
          tasks.length ===
            0 && (
            <Paper
              sx={{
                p: 3
              }}
            >
              <Typography>
                No active tasks
                found for this
                client.
              </Typography>
            </Paper>
          )}

        {!loading &&
          !errorMessage &&
          tasks.map(
            (task) => (
              <Paper
                key={
                  task.id
                }
                elevation={2}
                sx={{
                  p: 3
                }}
              >
                <Stack
                  spacing={2}
                >
                  <Box
                    sx={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center"
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {
                        task.title
                      }
                    </Typography>

                    <Chip
                      label={
                        task.taskStatus
                      }
                      color={getStatusColor(
                        task.taskStatus
                      )}
                    />
                  </Box>

                  <Typography>
                    {
                      task.description
                    }
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Created:
                    {" "}
                    {new Date(
                      task.createdAt
                    ).toLocaleDateString()}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                  >
                    {(task.taskStatus ===
                      "In Review" ||
                      task.taskStatus ===
                        "Completed") && (
                      <Button
                        variant="outlined"
                        startIcon={
                          <DescriptionIcon />
                        }
                        onClick={() =>
                          void handleDownload(
                            task
                          )
                        }
                      >
                        View File
                      </Button>
                    )}

                    {task.taskStatus ===
                      "In Review" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          void markCompleted(
                            task
                          )
                        }
                      >
                        Mark Complete
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Paper>
            )
          )}
      </Stack>
    </Container>
  );
}