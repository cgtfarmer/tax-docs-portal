import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../App";
import ApiAccessor from "../../accessors/api-accessor";
import { Client } from "../../models/client";

const apiAccessor = new ApiAccessor();

export default function Page() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    async function fetchClient() {
      if (!user?.id) return;

      const data = await apiAccessor.getClient(user.id);
      setClient(data);
    }

    void fetchClient();
  }, [user]);

  if (!user || !client) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4">My Account</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>{client.firstName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>{client.lastName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{client.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>{client.username}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate("/app/client")}>
            Back
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/app/client/account/edit")}
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}