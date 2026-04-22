import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ApiAccessor from '../../accessors/api-accessor';
import { Accountant } from '../../models/accountant';

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

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Accountants
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="accountants table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
