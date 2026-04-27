import { useEffect, useState } from 'react';
import { Link as RouterLink, Params, useParams } from 'react-router';
import { Divider, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ApiAccessor from '../../../accessors/api-accessor';
import { Accountant } from '../../../models/accountant';

interface RouteParams extends Params {
  accountantId: string
};

const apiAccessor = new ApiAccessor();

export default function Page() {
  const [accountant, setAccountant] = useState<Accountant>();

  const params = useParams<RouteParams>();

  useEffect(() => {
    async function fetchAccountant(accountantId: string) {
      const accountant = await apiAccessor.getAccountant(accountantId);

      setAccountant(accountant);
    }

    if (!params.accountantId) return;

    console.log(`Accountant ID: ${params.accountantId}`);

    void fetchAccountant(params.accountantId);
  }, [params.accountantId]);

  if (!accountant) return null;

  const rows = [
    { key: 'ID', value: accountant.id },
    { key: 'First Name', value: accountant.firstName },
    { key: 'Last Name', value: accountant.lastName },
    { key: 'Email', value: accountant.email },
    { key: 'Username', value: accountant.username },
    { key: 'Password', value: accountant.passwordHash }
  ];

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Accountant
      </Typography>

      <Stack direction="row" gap="0.5rem">
        <Link component={RouterLink} to="/admin/accountants">Back</Link>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Link component={RouterLink} to={`/admin/accountants/${accountant.id ?? ''}/edit`}>
          Edit
        </Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ width: '50%' }}>
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