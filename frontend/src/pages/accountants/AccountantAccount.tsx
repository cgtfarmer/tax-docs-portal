import { Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../App";
import ApiAccessor from "../../accessors/api-accessor";
import { Accountant } from "../../models/accountant";

const apiAccessor = new ApiAccessor();

export default function Page() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accountant, setAccountant] = useState<Accountant | null>(null);

  useEffect(() => {
    async function fetchAccountant() {
      if (!user?.id) return;

      const data = await apiAccessor.getAccountant(user.id);
      setAccountant(data);
    }

    void fetchAccountant();
  }, [user]);

  if (!user || !accountant) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4">My Account</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>{accountant.firstName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>{accountant.lastName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{accountant.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>{accountant.username}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate("/app/accountant")}>
            Back
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate(`/app/accountant/${accountant.id}/edit`)}
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}