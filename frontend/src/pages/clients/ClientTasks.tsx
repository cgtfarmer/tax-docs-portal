import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

type Task = {
  id: number;
  title: string;
  status: "in progress" | "in review" | "completed";
  hasFile?: boolean;
};

export default function ClientTasks() {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Upload W4",
      status: "in progress",
    },
    {
      id: 2,
      title: "Upload 1099 Form",
      status: "in review",
    },
    {
      id: 3,
      title: "Upload 2025 Tax Forms",
      status: "completed",
      hasFile: true,
    },
    {
      id: 4,
      title: "Upload 2025 Financial Statement",
      status: "completed",
      hasFile: true,
    },
  ];

  return (
    <Stack spacing={3}>

      <Typography variant="h4" fontWeight="bold">
        Task Board
      </Typography>

      {tasks.map((task) => (
        <Paper
          key={task.id}
          variant="outlined"
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {task.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {task.status}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            {task.hasFile && (
              <DescriptionIcon />
            )}

            {task.status === "in progress" && (
              <Button variant="outlined">
                Upload file
              </Button>
            )}

            {task.status === "in review" && (
              <>
                <Button variant="outlined">
                  View file
                </Button>
                <Button variant="outlined">
                  Upload file
                </Button>
              </>
            )}

            {task.status === "completed" && (
              <Button variant="outlined">
                View file
              </Button>
            )}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}