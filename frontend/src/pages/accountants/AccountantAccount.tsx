import { Container, Table, TableBody, TableCell, TableRow, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
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

  if (!user) {
    return <p>Loading...</p>;
  }

  if (user.role !== "ACCOUNTANT") {
    return <p>Unauthorized</p>;
  }

  if (!accountant) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-3">
      <h2>My Account</h2>

      <div style={{ marginBottom: "10px" }}>
        <Link component="button" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          Back
        </Link>

        <Link component={RouterLink} to={`/app/accountant/${user.id}/edit`}>
          Edit
        </Link>
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell>{accountant.id}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><strong>First Name</strong></TableCell>
            <TableCell>{accountant.firstName}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><strong>Last Name</strong></TableCell>
            <TableCell>{accountant.lastName}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell>{accountant.email}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><strong>Username</strong></TableCell>
            <TableCell>{accountant.username}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </Container>
  );
}