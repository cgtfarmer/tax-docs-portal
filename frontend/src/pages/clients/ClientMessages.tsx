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

import ApiAccessor from "../../accessors/api-accessor";
import { useAuth } from "../../App";
import { Message } from "../../models/message";
import { Client } from "../../models/client";
import { Accountant } from "../../models/accountant";

const apiAccessor =
  new ApiAccessor();

export default function ClientMessages() {
  const { user } =
    useAuth();

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
    accountant,
    setAccountant
  ] = useState<
    Accountant | null
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
  }, [user]);

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
            "No client logged in."
          );
          return;
        }

        const clientResult =
          await apiAccessor.getClient(
            user.id
          );

        setClient(
          clientResult
        );

        if (
          !clientResult.accountantId
        ) {
          setErrorMessage(
            "No accountant assigned."
          );
          return;
        }

        const accountantResult =
          await apiAccessor.getAccountant(
            clientResult.accountantId
          );

        setAccountant(
          accountantResult
        );

        const messageResult =
          await apiAccessor.getConversationMessages(
            user.id,
            clientResult.accountantId
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
        !client?.accountantId
      ) {
        return;
      }

      try {
        const result =
          await apiAccessor.getConversationMessages(
            user.id,
            client.accountantId
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
          !client?.accountantId
        ) {
          return;
        }

        setSending(true);
        setErrorMessage("");

        await apiAccessor.createMessage({
          clientId:
            user.id,
          accountantId:
            client.accountantId,
          senderType:
            "CLIENT",
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
                  "CLIENT";

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
                            : accountant?.firstName ||
                              "Accountant"}
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
            placeholder="Type a message..."
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