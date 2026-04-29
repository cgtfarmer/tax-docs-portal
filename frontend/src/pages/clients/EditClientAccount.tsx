import { Container, TextField, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../App";
import ApiAccessor from "../../accessors/api-accessor";

const apiAccessor = new ApiAccessor();

export default function Page() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    passwordHash: "",
    accountantId: null as string | null,
  });

  useEffect(() => {
    async function fetchClient() {
      if (!user?.id) return;

      const data = await apiAccessor.getClient(user.id);

      setForm({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        passwordHash: data.passwordHash,
        accountantId: data.accountantId,
      });
    }

    void fetchClient();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await apiAccessor.updateClient(form);
    navigate("/app/client/account");
  };

  return (
    <Container sx={{ mt: 3 }}>
      <h2>Edit My Account</h2>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="username"
          label="Username"
          value={form.username}
          onChange={handleChange}
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="flex-start">
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>

          <Button
            variant="contained"
            size="medium"
            sx={{ px: 4 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}