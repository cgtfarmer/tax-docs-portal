import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ApiAccessor from '../../accessors/api-accessor';
import { Client } from '../../models/client';

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
