import {
  Button,
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

import DescriptionIcon from "@mui/icons-material/Description";

import ApiAccessor from "../../accessors/api-accessor";
import { useAuth } from "../../App";
import { ClientDocument } from "../../models/document";

const apiAccessor =
  new ApiAccessor();

export default function Page() {
  const { user } =
    useAuth();

  const [
    documents,
    setDocuments
  ] = useState<
    ClientDocument[]
  >([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage
  ] = useState("");

  useEffect(() => {
    void loadDocuments();
  }, [user]);

  const loadDocuments =
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

        const result =
          await apiAccessor.getDocumentsByClient(
            user.id
          );

        setDocuments(
          result
        );
      } catch (error) {
        console.error(
          error
        );

        setErrorMessage(
          "Unable to load documents."
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDownload =
    async (
      documentId?: string,
      fileName?: string
    ): Promise<void> => {
      try {
        if (!documentId) {
          return;
        }

        const blob =
          await apiAccessor.downloadDocument(
            documentId
          );

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          window.document.createElement(
            "a"
          );

        link.href =
          url;

        link.download =
          fileName ??
          "document";

        window.document.body.appendChild(
          link
        );

        link.click();
        link.remove();

        window.URL.revokeObjectURL(
          url
        );
      } catch (error) {
        console.error(
          error
        );

        setErrorMessage(
          "Unable to download document."
        );
      }
    };

  return (
    <Container
      maxWidth="md"
      className="mt-3"
    >
      <Stack spacing={3}>
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          My Documents
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
          documents.length ===
            0 && (
            <Paper
              sx={{
                p: 3
              }}
            >
              <Typography>
                No uploaded
                documents found.
              </Typography>
            </Paper>
          )}

        {!loading &&
          documents.map(
            (
              document
            ) => (
              <Paper
                key={
                  document.id
                }
                sx={{
                  p: 3
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <Typography
                      fontWeight="bold"
                    >
                      {
                        document.storageKey
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      ID:
                      {" "}
                      {
                        document.id
                      }
                    </Typography>
                  </Stack>

                  <Button
                    variant="outlined"
                    startIcon={
                      <DescriptionIcon />
                    }
                    onClick={() =>
                      void handleDownload(
                        document.id,
                        document.storageKey
                      )
                    }
                  >
                    View File
                  </Button>
                </Stack>
              </Paper>
            )
          )}
      </Stack>
    </Container>
  );
}