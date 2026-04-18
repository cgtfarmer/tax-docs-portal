import { useEffect, useState } from 'react';
import { Link as RouterLink, Params, useParams } from 'react-router';
import { Divider, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ApiAccessor from '../../accessors/api-accessor';
import { Client } from '../../models/client';

interface RouteParams extends Params {
  clientId: string
};

const apiAccessor = new ApiAccessor();

export default function Page() {
  const [client, setClient] = useState<Client>();

  const params = useParams<RouteParams>();

  useEffect(() => {
    async function fetchClient(clientId: string) {
      const client = await apiAccessor.getClient(clientId);

      setClient(client);
    }

    if (!params.clientId) return;

    console.log(`Client ID: ${params.clientId}`);

    void fetchClient(params.clientId);
  }, [params.clientId]);

  if (!client) return null;

  const rows = [
    { key: 'ID', value: client.id },
    { key: 'First Name', value: client.firstName },
    { key: 'Last Name', value: client.lastName },
    { key: 'Email', value: client.email },
    { key: 'Username', value: client.username },
    { key: 'Password', value: client.passwordHash }
  ];

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Client
      </Typography>

      <Stack direction="row" gap="0.5rem">
        <Link component={RouterLink} to="/admin/clients">Back</Link>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Link component={RouterLink} to={`/admin/clients/${client.id ?? ''}/edit`}>Edit</Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: '50%'
                  }}
                >
                  {row.key}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
