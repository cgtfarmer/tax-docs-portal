import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Button, Stack, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ApiAccessor from '../../../accessors/api-accessor';
import { ClientInput } from '../../../models/client-input';
import { ClientMapper } from '../../../mapper/client-mapper';
import { Accountant } from '../../../models/accountant';

import { Link as RouterLink, Params, useParams, useNavigate } from 'react-router';

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
    passwordHash: '',
    accountantId: ''
  });

  // all accountants for the dropdown
  const [accountants, setAccountants] = useState<Accountant[]>([]);

  const params = useParams<RouteParams>();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClient(clientId: string) {
      const client = await apiAccessor.getClient(clientId);

      const input = clientMapper.mapModelToInput(client);

      setClientInput(input);
    }

    //gets all accountants for the dropdown
    async function fetchAccountants() {
      const accountantList = await apiAccessor.listAccountants();
      setAccountants(accountantList)
    }

    if (!params.clientId) return;

    console.log(`Client ID: ${params.clientId}`);

    void fetchClient(params.clientId);
    void fetchAccountants();
  }, [params.clientId]);

  const handleUpdateClient = async () => {
    const client = clientMapper.mapInputToModel(clientInput);

    const newClient = await apiAccessor.updateClient(client);

    await navigate('/admin/clients');
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Update client
      </Typography>

      <Box sx={{ py: 3 }}>
        <Link component={RouterLink} to="/admin/clients">Back</Link>
      </Box>

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
        {/* Drop Down so admin can assign this client to an accountant */}
        <FormControl fullWidth>
          <InputLabel id="accountant-select-label">Assign Accountant</InputLabel>
          <Select
            labelId="accountant-select-label"
            value={clientInput.accountantId ?? ''}
            label="Assign Accountant"
            onChange={(e: SelectChangeEvent) => {
              setClientInput(client => ({
                ...client,
                accountantId: e.target.value
              }));
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {accountants.map((accountant) => (
              <MenuItem key={accountant.id} value={accountant.id ?? ''}>
                {accountant.firstName} {accountant.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
