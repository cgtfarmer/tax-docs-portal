import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";

export default function AccountantMessageBoard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Message Board
      </Typography>

      <Typography variant="h6" gutterBottom>
        Client: John Doe
      </Typography>

      <Paper sx={{ p: 3, minHeight: 350, mb: 3 }}>
        <Stack spacing={3}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Paper sx={{ p: 2, maxWidth: 320 }}>
              <Typography variant="h6">Mary Jane</Typography>
              <Typography>a friendly remind to upload your W4</Typography>
              <Typography variant="caption" color="text.secondary">
                Sent 2026.4.3
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Paper sx={{ p: 2, maxWidth: 320 }}>
              <Typography variant="h6">John Doe</Typography>
              <Typography>Thank you! I&apos;ll send that right away</Typography>
            </Paper>
          </Box>
        </Stack>
      </Paper>

      <Stack direction="row" spacing={2}>
        <TextField fullWidth placeholder="Type a message..." />
        <Button variant="contained">Send</Button>
      </Stack>
    </Box>
  );
}