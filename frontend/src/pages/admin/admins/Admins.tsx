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
import { Admin } from '../../../models/admin';

const apiAccessor = new ApiAccessor();

export default function Page() {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    async function fetchAdmins() {
      const data = await apiAccessor.listAdmins();
      setAdmins(data);
    }

    void fetchAdmins();
  }, []);

  const handleDestroyAdmin = async (adminId: string | undefined) => {
    const confirmation = window.confirm('Are you sure you want to delete this admin?');

    if (!confirmation) return;
    if (!adminId) return;

    const deleteSuccessful = await apiAccessor.destroyAdmin(adminId);

    if (!deleteSuccessful) return;

    const admins = await apiAccessor.listAdmins();

    setAdmins(admins);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Admins
      </Typography>

      <Link component={RouterLink} to="/admin/admins/new">
        Create
      </Link>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="admins table">
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
            {admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No admins found.</TableCell>
              </TableRow>
            ) : (
              admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/admin/admins/${admin.id ?? ''}`}
                      underline="hover"
                    >
                      {admin.id}
                    </Link>
                  </TableCell>

                  <TableCell>{admin.firstName}</TableCell>
                  <TableCell>{admin.lastName}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.username}</TableCell>

                  <TableCell>
                    <Stack direction="row" gap="0.5rem">
                      <Link component={RouterLink} to={`/admin/admins/${admin.id ?? ''}`}>
                        Show
                      </Link>

                      <Link component={RouterLink} to={`/admin/admins/${admin.id ?? ''}/edit`}>
                        Edit
                      </Link>

                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => void handleDestroyAdmin(admin.id)}
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