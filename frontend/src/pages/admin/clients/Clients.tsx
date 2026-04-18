import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ApiAccessor from '../../../accessors/api-accessor';
import { Client } from '../../../models/client';

const apiAccessor = new ApiAccessor();

export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchClients() {
      const clients = await apiAccessor.listClients();

      setClients(clients);
    }

    void fetchClients();
  }, []);

  const handleDestroyClient = async (clientId: string | undefined) => {
    const confirmation = window.confirm('Are you sure you want to delete this client?');

    if (!confirmation) return;

    if (!clientId) return;

    const deleteSuccessful = await apiAccessor.destroyClient(clientId);

    if (!deleteSuccessful) return;

    const clients = await apiAccessor.listClients();

    setClients(clients);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Clients
      </Typography>

      <Link component={RouterLink} to="/admin/clients/new">Create</Link>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Password</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {client.id}
                </TableCell>
                <TableCell>{client.firstName}</TableCell>
                <TableCell>{client.lastName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.username}</TableCell>
                <TableCell>{client.passwordHash}</TableCell>
                <TableCell>
                  <Stack direction="row" gap="0.5rem">
                    <Link
                      component={RouterLink}
                      to={`/admin/clients/${client.id ?? ''}`}
                    >
                      Show
                    </Link>

                    <Link
                      component={RouterLink}
                      to={`/admin/clients/${client.id ?? ''}/edit`}
                    >
                      Edit
                    </Link>

                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => void handleDestroyClient(client.id)}
                    >
                      Delete
                    </Link>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
