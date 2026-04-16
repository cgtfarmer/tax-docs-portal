import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Message = {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  isUser: boolean;
};

export default function ClientMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Mary Jane",
      text: "a friendly remind to upload your W4",
      timestamp: "Sent 2026.4.3",
      isUser: false,
    },
    {
      id: 2,
      sender: "John Doe",
      text: "Thank you! I’ll send that right away",
      timestamp: "",
      isUser: true,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "John Doe",
      text: input,
      timestamp: new Date().toLocaleString(),
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <Stack sx={{ height: "100%" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold">
        Message Board
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Accountant : Mary Jane
      </Typography>

      {/* Message container */}
      <Paper
        variant="outlined"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          height: "100%",
        }}
      >
        
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: msg.isUser ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  maxWidth: "50%",
                }}
              >
                <Stack spacing={0.5}>
                  <Typography fontWeight="bold">
                    {msg.sender}
                  </Typography>

                  <Typography>{msg.text}</Typography>

                  {msg.timestamp && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {msg.timestamp}
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
            borderTop: "1px solid #ccc",
            pt: 1,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Aa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />

          <IconButton onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Stack>
  );
}