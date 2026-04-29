import { Container, TextField, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ApiAccessor from "../../accessors/api-accessor";

const apiAccessor = new ApiAccessor();

export default function Page() {
  const { accountantId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    async function fetchAccountant() {
      if (!accountantId) return;

      const data = await apiAccessor.getAccountant(accountantId);
      setForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
      });
    }

    fetchAccountant();
  }, [accountantId]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await apiAccessor.updateAccountant({
      id: accountantId,
      ...form,
    });

    navigate("/app/accountant/account");
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

        {/* Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-start">
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
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