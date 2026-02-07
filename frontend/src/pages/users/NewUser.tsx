import { ChangeEvent, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import ApiAccessor from '../../accessors/api-accessor';
import { UserMapper } from '../../mapper/user-mapper';
import { UserInput } from '../../models/user-input';

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

  const navigate = useNavigate();

  const handleCreateUser = async (): Promise<void> => {
    console.log('NewUser#handleCreateUser');

    const user = userMapper.mapInputToModel(userInput);

    const newUser = await apiAccessor.createUser(user);

    await navigate(`/users/${newUser.id ?? ''}`);
  };

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Add user
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
          onClick={() => void handleCreateUser()}
          sx={{ maxWidth: '10rem' }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};
