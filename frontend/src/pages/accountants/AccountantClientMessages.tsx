import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  useParams
} from "react-router";

import ApiAccessor from "../../accessors/api-accessor";
import { useAuth } from "../../App";
import { Message } from "../../models/message";
import { Client } from "../../models/client";

const apiAccessor =
  new ApiAccessor();

export default function AccountantMessages() {
  const { user } =
    useAuth();

  const { clientId } =
    useParams();

  const [
    messages,
    setMessages
  ] = useState<
    Message[]
  >([]);

  const [
    client,
    setClient
  ] = useState<
    Client | null
  >(null);

  const [
    input,
    setInput
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    sending,
    setSending
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage
  ] = useState("");

  const scrollRef =
    useRef<
      HTMLDivElement | null
    >(null);

  useEffect(() => {
    void initializePage();
  }, [user, clientId]);

  useEffect(() => {
    scrollRef.current
      ?.scrollTo({
        top:
          scrollRef.current
            .scrollHeight,
        behavior:
          "smooth"
      });
  }, [messages]);

  const initializePage =
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

        const clientResult =
          await apiAccessor.getClient(
            clientId
          );

        setClient(
          clientResult
        );

        const messageResult =
          await apiAccessor.getConversationMessages(
            clientId,
            user.id
          );

        setMessages(
          messageResult
        );
      } catch (error) {
        console.error(
          error
        );

        setErrorMessage(
          "Unable to load messages."
        );
      } finally {
        setLoading(false);
      }
    };

  const loadMessages =
    async (): Promise<void> => {
      if (
        !user?.id ||
        !clientId
      ) {
        return;
      }

      try {
        const result =
          await apiAccessor.getConversationMessages(
            clientId,
            user.id
          );

        setMessages(
          result
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const handleSend =
    async (): Promise<void> => {
      try {
        if (
          !input.trim() ||
          !user?.id ||
          !clientId
        ) {
          return;
        }

        setSending(true);
        setErrorMessage("");

        await apiAccessor.createMessage({
          clientId:
            clientId,
          accountantId:
            user.id,
          senderType:
            "ACCOUNTANT",
          messageText:
            input.trim()
        });

        setInput("");

        await loadMessages();
      } catch (error) {
        console.error(
          error
        );

        setErrorMessage(
          "Unable to send message."
        );
      } finally {
        setSending(false);
      }
    };

  const formatDate =
    (
      value: string
    ): string => {
      if (!value) {
        return "";
      }

      const parsed =
        new Date(
          value.replace(
            " ",
            "T"
          )
        );

      if (
        isNaN(
          parsed.getTime()
        )
      ) {
        return value;
      }

      return parsed.toLocaleString();
    };

  return (
    <Stack
      spacing={2}
      sx={{
        height:
          "100%"
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        Message Board
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          height:
            "70vh",
          display:
            "flex",
          flexDirection:
            "column",
          p: 2,
          overflow:
            "hidden"
        }}
      >
        {loading && (
          <CircularProgress />
        )}

        {errorMessage && (
          <Typography color="error">
            {errorMessage}
          </Typography>
        )}

        <Box
          ref={scrollRef}
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY:
              "auto",
            display:
              "flex",
            flexDirection:
              "column",
            gap: 2,
            pr: 1,
            scrollBehavior:
              "smooth"
          }}
        >
          {!loading &&
            messages.map(
              (msg) => {
                const sender =
                  String(
                    msg.senderType
                  )
                    .trim()
                    .toUpperCase();

                const isUser =
                  sender ===
                  "ACCOUNTANT";

                return (
                  <Box
                    key={
                      msg.id
                    }
                    sx={{
                      display:
                        "flex",
                      justifyContent:
                        isUser
                          ? "flex-end"
                          : "flex-start"
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        maxWidth:
                          "60%"
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography fontWeight="bold">
                          {isUser
                            ? "You"
                            : client?.firstName ||
                              "Client"}
                        </Typography>

                        <Typography>
                          {
                            msg.messageText
                          }
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {formatDate(
                            msg.createdAt
                          )}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                );
              }
            )}
        </Box>

        <Box
          sx={{
            display:
              "flex",
            gap: 1,
            mt: 2,
            pt: 1,
            borderTop:
              "1px solid #ccc"
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Reply to client..."
            value={
              input
            }
            disabled={
              sending
            }
            onChange={(
              e
            ) =>
              setInput(
                e.target
                  .value
              )
            }
            onKeyDown={(
              e
            ) => {
              if (
                e.key ===
                  "Enter" &&
                !sending
              ) {
                void handleSend();
              }
            }}
          />

          <IconButton
            disabled={
              sending
            }
            onClick={() =>
              void handleSend()
            }
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Stack>
  );
}