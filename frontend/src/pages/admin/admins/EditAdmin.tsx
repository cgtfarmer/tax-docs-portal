import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Button, Stack, TextField, Typography, Box } from '@mui/material';
import ApiAccessor from '../../../accessors/api-accessor';
import { AdminInput } from '../../../models/admin-input';
import { AdminMapper } from '../../../mapper/admin-mapper';
import { Link as RouterLink, Params, useParams, useNavigate } from 'react-router';

interface RouteParams extends Params {
  adminId: string
};

const apiAccessor = new ApiAccessor();

const adminMapper = new AdminMapper();

export default function Page() {
  const [adminInput, setAdminInput] = useState<AdminInput>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    passwordHash: ''
  });

  const params = useParams<RouteParams>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdmin(adminId: string) {
      const admin = await apiAccessor.getAdmin(adminId);
      const input = adminMapper.mapModelToInput(admin);

      setAdminInput(input);
    }

    if (!params.adminId) return;

    console.log(`Admin ID: ${params.adminId}`);

    void fetchAdmin(params.adminId);
  }, [params.adminId]);

    const handleUpdateAdmin = async () => {
        const admin = adminMapper.mapInputToModel(adminInput);

        if (adminInput.passwordHash.trim() === '') {
            admin.passwordHash = '';
        }

        await apiAccessor.updateAdmin(admin);

        await navigate('/admin/admins');
        };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Update admin
      </Typography>

      <Box sx={{ py: 3 }}>
        <Link component={RouterLink} to="/admin/admins">Back</Link>
      </Box>

      <Stack gap="1rem" maxWidth="30rem">
        <TextField
          label="First Name"
          variant="outlined"
          value={adminInput.firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAdminInput(admin => ({
              ...admin,
              firstName: e.target.value
            }))
          }}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          value={adminInput.lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAdminInput(admin => ({
              ...admin,
              lastName: e.target.value
            }))
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          value={adminInput.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAdminInput(admin => ({
              ...admin,
              email: e.target.value
            }))
          }}
        />

        <TextField
          label="Username"
          variant="outlined"
          value={adminInput.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAdminInput(admin => ({
              ...admin,
              username: e.target.value
            }))
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          value={adminInput.passwordHash}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAdminInput(admin => ({
              ...admin,
              passwordHash: e.target.value
            }))
          }}
        />

        <Button
          variant="contained"
          onClick={() => void handleUpdateAdmin()}
          sx={{ maxWidth: '10rem' }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
}