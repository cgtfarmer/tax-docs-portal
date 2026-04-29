import { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router";

import {
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import ApiAccessor from "../../accessors/api-accessor";
import { Client } from "../../models/client";
import { useAuth } from "../../App";

const apiAccessor = new ApiAccessor();

export default function Page() {
  const { user } = useAuth();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClients() {
      try {
        if (!user?.id || user.role !== "ACCOUNTANT") {
          setLoading(false);
          return;
        }

        const result = await apiAccessor.getClientsByAccountant(user.id);

        setClients(result);
      } catch (error) {
        console.error(error);
        setError("Unable to load clients.");
      } finally {
        setLoading(false);
      }
    }

    void fetchClients();
  }, [user]);

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        My Clients
      </Typography>

      {loading && (
        <Box sx={{ py: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {!loading && !error && clients.length === 0 && (
        <Typography>No clients are currently assigned to you.</Typography>
      )}

      {!loading && !error && clients.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.firstName}</TableCell>
                  <TableCell>{client.lastName}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.username}</TableCell>

                  <TableCell>
                    <Stack direction="row" gap="0.75rem" flexWrap="wrap">
                      <Link
                        component={RouterLink}
                        to={`/app/accountant/clients/${client.id}`}
                      >
                        View
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}