import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ApiAccessor from '../../accessors/api-accessor';
import { Client } from '../../models/client';

const apiAccessor = new ApiAccessor();

export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);

  // only grabs the clients assigned to the logged in accountant
  useEffect(() => {
    async function fetchClients() {
      // const accountantId = localStorage.getItem('accountantId');
      // TEMP: using fake logged-in accountant id until Login Verification works
      const accountantId = 'f9762ee1-ec1e-442a-b5fe-6912e4849829';

      if (!accountantId) return;

      const clients = await apiAccessor.getClientsByAccountant(accountantId);

      setClients(clients);
    }

    void fetchClients();
  }, []);

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        My Clients
      </Typography>

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
                      to={`/app/accountant/clients/${client.id ?? ''}`}
                    >
                      Show
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
