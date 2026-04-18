import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { Params, useNavigate, useParams } from 'react-router';
import ApiAccessor from '../../accessors/api-accessor';
import { UserInput } from '../../models/user-input';
import { UserMapper } from '../../mapper/user-mapper';

interface RouteParams extends Params {
  userId: string
};

const apiAccessor = new ApiAccessor();

const userMapper = new UserMapper();

export default function Page() {
  const [userInput, setUserInput] = useState<UserInput>({
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    weight: '',
    smoker: false
  });

  const params = useParams<RouteParams>();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser(userId: string) {
      const user = await apiAccessor.getUser(userId);

      const input = userMapper.mapModelToInput(user);

      setUserInput(input);
    }

    if (!params.userId) return;

    console.log(`User ID: ${params.userId}`);

    void fetchUser(params.userId);
  }, [params.userId]);

  const handleUpdateUser = async () => {
    const user = userMapper.mapInputToModel(userInput);

    const newUser = await apiAccessor.updateUser(user);

    await navigate(`/users/${newUser.id ?? ''}`);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Update user
      </Typography>

      <Stack gap="1rem" maxWidth="30rem">
        <TextField
          label="First Name"
          variant="outlined"
          value={userInput.firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInput(user => ({
              ...user,
              firstName: e.target.value
            }))
          }}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          value={userInput.lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInput(user => ({
              ...user,
              lastName: e.target.value
            }))
          }}
        />

        <TextField
          label="Age"
          variant="outlined"
          type="number"
          value={userInput.age}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInput(user => ({
              ...user,
              age: e.target.value
            }))
          }}
        />

        <TextField
          label="Weight"
          variant="outlined"
          type="number"
          value={userInput.weight}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInput(user => ({
              ...user,
              weight: e.target.value
            }))
          }}
        />

        <FormGroup>
          <FormControlLabel
            label="Smoker"
            control={
              <Checkbox
                checked={userInput.smoker}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUserInput(user => ({
                    ...user,
                    smoker: e.target.checked
                  }))
                }}
              />
            }
          />
        </FormGroup>

        <Button
          variant="contained"
          onClick={() => void handleUpdateUser()}
          sx={{ maxWidth: '10rem' }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};
