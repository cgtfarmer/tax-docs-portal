import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router';
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
} from '@mui/material';
import ApiAccessor from '../../../accessors/api-accessor';
import { Accountant } from '../../../models/accountant';

const apiAccessor = new ApiAccessor();

export default function Page() {
  const [accountants, setAccountants] = useState<Accountant[]>([]);

  useEffect(() => {
    async function fetchAccountants() {
      const data = await apiAccessor.listAccountants();
      setAccountants(data);
    }

    void fetchAccountants();
  }, []);

  const handleDestroyAccountant = async (accountantId: string | undefined) => {
    const confirmation = window.confirm('Are you sure you want to delete this accountant?');

    if (!confirmation) return;
    if (!accountantId) return;

    const deleteSuccessful = await apiAccessor.destroyAccountant(accountantId);

    if (!deleteSuccessful) return;

    const accountants = await apiAccessor.listAccountants();

    setAccountants(accountants);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Accountants
      </Typography>

      <Link component={RouterLink} to="/admin/accountants/new">
        Create
      </Link>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="accountants table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No accountants found.</TableCell>
              </TableRow>
            ) : (
              accountants.map((accountant) => (
                <TableRow key={accountant.id}>
                  <TableCell> <Link component={RouterLink} to={`/admin/accountants/${accountant.id ?? ''}`} underline="hover"> {accountant.id} </Link></TableCell>
                  <TableCell>{accountant.firstName}</TableCell>
                  <TableCell>{accountant.lastName}</TableCell>
                  <TableCell>{accountant.email}</TableCell>
                  <TableCell>{accountant.username}</TableCell>
                  <TableCell>
                    <Stack direction="row" gap="0.5rem">
                      <Link component={RouterLink} to={`/admin/accountants/${accountant.id ?? ''}`}>
                        Show
                      </Link>

                      <Link component={RouterLink} to={`/admin/accountants/${accountant.id ?? ''}/edit`}>
                        Edit
                      </Link>

                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => void handleDestroyAccountant(accountant.id)}
                      >
                        Delete
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
