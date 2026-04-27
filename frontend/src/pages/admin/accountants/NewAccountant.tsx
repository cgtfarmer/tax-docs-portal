import { ChangeEvent, useState } from 'react';
import { Link, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import ApiAccessor from '../../../accessors/api-accessor';
import { AccountantMapper } from '../../../mapper/accountant-mapper';
import { AccountantInput } from '../../../models/accountant-input';

const apiAccessor = new ApiAccessor();

const accountantMapper = new AccountantMapper();

export default function Page() {
  const [accountantInput, setAccountantInput] = useState<AccountantInput>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    passwordHash: ''
  });

  const navigate = useNavigate();

  const handleCreateAccountant = async (): Promise<void> => {
    console.log('NewAccountant#handleCreateAccountant');

    const accountant = accountantMapper.mapInputToModel(accountantInput);

    const newAccountant = await apiAccessor.createAccountant(accountant);

    await navigate(`/admin/accountants/${newAccountant.id ?? ''}`);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Add accountant
      </Typography>

      <Box sx={{ py: 3 }}>
        <Link component={RouterLink} to="/admin/accountants">Back</Link>
      </Box>

      <Stack gap="1rem" maxWidth="30rem">
        <TextField
          label="First Name"
          variant="outlined"
          value={accountantInput.firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAccountantInput(accountant => ({
              ...accountant,
              firstName: e.target.value
            }))
          }}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          value={accountantInput.lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAccountantInput(accountant => ({
              ...accountant,
              lastName: e.target.value
            }))
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          value={accountantInput.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAccountantInput(accountant => ({
              ...accountant,
              email: e.target.value
            }))
          }}
        />

        <TextField
          label="Username"
          variant="outlined"
          value={accountantInput.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAccountantInput(accountant => ({
              ...accountant,
              username: e.target.value
            }))
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          value={accountantInput.passwordHash}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAccountantInput(accountant => ({
              ...accountant,
              passwordHash: e.target.value
            }))
          }}
        />

        <Button
          variant="contained"
          onClick={() => void handleCreateAccountant()}
          sx={{ maxWidth: '10rem' }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};