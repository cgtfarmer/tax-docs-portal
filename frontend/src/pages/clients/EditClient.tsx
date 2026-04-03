import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Params, useNavigate, useParams } from 'react-router';
import ApiAccessor from '../../accessors/api-accessor';
import { ClientInput } from '../../models/client-input';
import { ClientMapper } from '../../mapper/client-mapper';

interface RouteParams extends Params {
  clientId: string
};

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

  const params = useParams<RouteParams>();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClient(clientId: string) {
      const client = await apiAccessor.getClient(clientId);

      const input = clientMapper.mapModelToInput(client);

      setClientInput(input);
    }

    if (!params.clientId) return;

    console.log(`Client ID: ${params.clientId}`);

    void fetchClient(params.clientId);
  }, [params.clientId]);

  const handleUpdateClient = async () => {
    const client = clientMapper.mapInputToModel(clientInput);

    const newClient = await apiAccessor.updateClient(client);

    await navigate(`/clients/${newClient.id ?? ''}`);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Update client
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
              passwordHash: e.target.value
            }))
          }}
        />

        <Button
          variant="contained"
          onClick={() => void handleUpdateClient()}
          sx={{ maxWidth: '10rem' }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};
