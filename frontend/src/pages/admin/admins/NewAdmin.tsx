import { ChangeEvent, useState } from 'react';
import { Link, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import ApiAccessor from '../../../accessors/api-accessor';
import { AdminMapper } from '../../../mapper/admin-mapper';
import { AdminInput } from '../../../models/admin-input';

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

  const navigate = useNavigate();

  const handleCreateAdmin = async (): Promise<void> => {
    console.log('NewAdmin#handleCreateAdmin');

    const admin = adminMapper.mapInputToModel(adminInput);

    const newAdmin = await apiAccessor.createAdmin(admin);

    await navigate(`/admin/admins/${newAdmin.id ?? ''}`);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Add admin
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
          onClick={() => void handleCreateAdmin()}
          sx={{ maxWidth: '10rem' }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};