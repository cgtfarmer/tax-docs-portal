import { useEffect, useState } from 'react';
import { Link as RouterLink, Params, useParams } from 'react-router';
import { Divider, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ApiAccessor from '../../../accessors/api-accessor';
import { Admin } from '../../../models/admin';

interface RouteParams extends Params {
  adminId: string
};

const apiAccessor = new ApiAccessor();

export default function Page() {
  const [admin, setAdmin] = useState<Admin>();

  const params = useParams<RouteParams>();

  useEffect(() => {
    async function fetchAdmin(adminId: string) {
      const admin = await apiAccessor.getAdmin(adminId);

      setAdmin(admin);
    }

    if (!params.adminId) return;

    console.log(`Admin ID: ${params.adminId}`);

    void fetchAdmin(params.adminId);
  }, [params.adminId]);

  if (!admin) return null;

  const rows = [
    { key: 'ID', value: admin.id },
    { key: 'First Name', value: admin.firstName },
    { key: 'Last Name', value: admin.lastName },
    { key: 'Email', value: admin.email },
    { key: 'Username', value: admin.username },
    { key: 'Password', value: admin.passwordHash }
  ];

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Admin
      </Typography>

      <Stack direction="row" gap="0.5rem">
        <Link component={RouterLink} to="/admin/admins">Back</Link>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Link component={RouterLink} to={`/admin/admins/${admin.id ?? ''}/edit`}>
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