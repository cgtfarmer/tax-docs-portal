import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import { useParams } from "react-router";

import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";

import ApiAccessor from "../../accessors/api-accessor";
import { ClientDocument } from "../../models/document";

const apiAccessor = new ApiAccessor();

export default function Page() {
  const { clientId } = useParams();

  const [documents, setDocuments] = useState<ClientDocument[]>([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    void loadDocuments();
  }, [clientId]);

  const loadDocuments = async (): Promise<void> => {
    try {
      setLoading(true);
      setErrorMessage("");

      if (!clientId) {
        setErrorMessage("No client selected.");
        return;
      }

      const result = await apiAccessor.getDocumentsByClient(clientId);

      setDocuments(result);
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to load client documents.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (
    documentId?: string,
    fileName?: string
  ): Promise<void> => {
    try {
      if (!documentId) {
        return;
      }

      const blob = await apiAccessor.downloadDocument(documentId);

      const url = window.URL.createObjectURL(blob);

      const link = window.document.createElement("a");

      link.href = url;

      link.download = fileName ?? "document";

      window.document.body.appendChild(link);

      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to download document.");
    }
  };

  const handleDelete = async (documentId?: string): Promise<void> => {
    try {
      if (!documentId) {
        return;
      }

      setErrorMessage("");

      await apiAccessor.destroyDocument(documentId);

      await loadDocuments();
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to remove document.");
    }
  };

  return (
    <Container maxWidth="md" className="mt-3">
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight="bold">
          Client Documents
        </Typography>

        {loading && <CircularProgress />}

        {errorMessage && <Typography color="error">{errorMessage}</Typography>}

        {!loading && documents.length === 0 && (
          <Paper
            sx={{
              p: 3,
            }}
          >
            <Typography>No documents found for this client.</Typography>
          </Paper>
        )}

        {!loading &&
          documents.map((document) => (
            <Paper
              key={document.id}
              sx={{
                p: 3,
              }}
            >
              <Stack spacing={2}>
                <Typography fontWeight="bold">{document.storageKey}</Typography>

                {/*<Typography variant="body2" color="text.secondary">
                  ID: {document.id}
                </Typography>*/}

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    onClick={() =>
                      void handleDownload(document.id, document.storageKey)
                    }
                  >
                    View File
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => void handleDelete(document.id)}
                  >
                    Remove File
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          ))}
      </Stack>
    </Container>
  );
}
