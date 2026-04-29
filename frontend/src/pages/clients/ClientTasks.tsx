/* ClientTasks.tsx */

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import ApiAccessor from "../../accessors/api-accessor";
import { useAuth } from "../../App";
import { Task } from "../../models/task";
import { ClientDocument } from "../../models/document";

const apiAccessor =
  new ApiAccessor();

export default function ClientTasks() {
  const { user } = useAuth();

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const fileRefs = useRef<
    Record<
      string,
      HTMLInputElement | null
    >
  >({});

  useEffect(() => {
    void loadTasks();
  }, [user]);

  const loadTasks =
    async (): Promise<void> => {
      try {
        setLoading(true);
        setErrorMessage("");

        if (!user?.id) {
          return;
        }

        const result =
          await apiAccessor.getActiveTasksByClient(
            user.id
          );

        setTasks(result);
      } catch {
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

  const openFilePicker = (
    taskId: string
  ): void => {
    fileRefs.current[
      taskId
    ]?.click();
  };

  const handleUpload =
    async (
      task: Task,
      file: File | null
    ): Promise<void> => {
      try {
        if (
          !file ||
          !user?.id
        ) {
          return;
        }

        setErrorMessage("");

        await apiAccessor.uploadDocument(
          user.id,
          getDocumentType(
            task.title
          ),
          file
        );

        await apiAccessor.updateTask({
          ...task,
          taskStatus:
            "In Review",
          updatedAt:
            new Date().toISOString(),
        });

        await loadTasks();
      } catch {
        setErrorMessage(
          "Unable to upload file."
        );
      }
    };

  const handleDownload =
    async (
      task: Task
    ): Promise<void> => {
      try {
        if (!user?.id) {
          return;
        }

        setErrorMessage("");

        const clientDocument: ClientDocument =
          await apiAccessor.getClientDocument(
            user.id,
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
      } catch {
        setErrorMessage(
          "Unable to download file."
        );
      }
    };

  const getChipColor = (
    status: string
  ):
    | "info"
    | "warning"
    | "success" => {
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
    <Stack spacing={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        Task Board
      </Typography>

      {loading && (
        <CircularProgress />
      )}

      {errorMessage && (
        <Typography color="error">
          {errorMessage}
        </Typography>
      )}

      {!loading &&
        tasks.length ===
          0 && (
          <Paper
            variant="outlined"
            sx={{ p: 3 }}
          >
            <Typography>
              No active tasks.
            </Typography>
          </Paper>
        )}

      {!loading &&
        tasks.map(
          (task) => (
            <Paper
              key={task.id}
              variant="outlined"
              sx={{
                p: 2,
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >
              <input
                hidden
                type="file"
                ref={(el) => {
                  fileRefs.current[
                    task.id
                  ] = el;
                }}
                onChange={(
                  e
                ) =>
                  void handleUpload(
                    task,
                    e.target
                      .files?.[0] ??
                      null
                  )
                }
              />

              <Box>
                <Typography variant="h6">
                  {task.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {
                    task.description
                  }
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Chip
                  label={
                    task.taskStatus
                  }
                  color={getChipColor(
                    task.taskStatus
                  )}
                />

                {(task.taskStatus ===
                  "In Review" ||
                  task.taskStatus ===
                    "Completed") && (
                  <DescriptionIcon />
                )}

                {task.taskStatus ===
                  "In Progress" && (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      openFilePicker(
                        task.id
                      )
                    }
                  >
                    Upload File
                  </Button>
                )}

                {(task.taskStatus ===
                  "In Review" ||
                  task.taskStatus ===
                    "Completed") && (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      void handleDownload(
                        task
                      )
                    }
                  >
                    View File
                  </Button>
                )}
              </Stack>
            </Paper>
          )
        )}
    </Stack>
  );
}