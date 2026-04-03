import { ChangeEvent, useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import ApiAccessor from '../../accessors/api-accessor';
import { ClientMapper } from '../../mapper/client-mapper';
import { ClientInput } from '../../models/client-input';

const apiAccessor = new ApiAccessor();

const clientMapper = new ClientMapper();

export default function Page() {
  const [clientInput, setClientInput] = useState<ClientInput>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    passwordHash: ''
  });

  const navigate = useNavigate();

  const handleCreateClient = async (): Promise<void> => {
    console.log('NewClient#handleCreateClient');

    const client = clientMapper.mapInputToModel(clientInput);

    const newClient = await apiAccessor.createClient(client);

    await navigate(`/clients/${newClient.id ?? ''}`);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Add client
      </Typography>

      <Stack gap="1rem" maxWidth="30rem">
        <TextField
          label="First Name"
          variant="outlined"
          value={clientInput.firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setClientInput(client => ({
              ...client,
              firstName: e.target.value
            }))
          }}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          value={clientInput.lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setClientInput(client => ({
              ...client,
              lastName: e.target.value
            }))
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          value={clientInput.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setClientInput(client => ({
              ...client,
              email: e.target.value
            }))
          }}
        />

        <TextField
          label="Username"
          variant="outlined"
          value={clientInput.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setClientInput(client => ({
              ...client,
              username: e.target.value
            }))
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          value={clientInput.passwordHash}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setClientInput(client => ({
              ...client,
              password: e.target.value
            }))
          }}
        />

        <Button
          variant="contained"
          onClick={() => void handleCreateClient()}
          sx={{ maxWidth: '10rem' }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};
