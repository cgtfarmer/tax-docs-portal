import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Button, Stack, TextField, Typography, Box } from '@mui/material';
import ApiAccessor from '../../../accessors/api-accessor';
import { AccountantInput } from '../../../models/accountant-input';
import { AccountantMapper } from '../../../mapper/accountant-mapper';
import { Link as RouterLink, Params, useParams, useNavigate } from 'react-router';

interface RouteParams extends Params {
  accountantId: string
};

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

  const params = useParams<RouteParams>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAccountant(accountantId: string) {
      const accountant = await apiAccessor.getAccountant(accountantId);
      const input = accountantMapper.mapModelToInput(accountant);

      setAccountantInput(input);
    }

    if (!params.accountantId) return;

    console.log(`Accountant ID: ${params.accountantId}`);

    void fetchAccountant(params.accountantId);
  }, [params.accountantId]);

  const handleUpdateAccountant = async () => {
    const accountant = accountantMapper.mapInputToModel(accountantInput);

    await apiAccessor.updateAccountant(accountant);

    await navigate('/admin/accountants');
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Update accountant
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
          onClick={() => void handleUpdateAccountant()}
          sx={{ maxWidth: '10rem' }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};