import { Stack, Container, Box, Typography, Button, Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";

export default function ClientAccount() {
  return (
    <Stack sx={{ height: "100vh" }}>

      <Container component="main" sx={{ pt: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Account Information
        </Typography>

        <Box sx={{ display: "flex", gap: 4 }}>
          
          <Paper sx={{ p: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>First Name</strong></TableCell>
                  <TableCell>John</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Last Name</strong></TableCell>
                  <TableCell>Doe</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell>John_Doe99@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell>John_Doe9</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Password</strong></TableCell>
                  <TableCell>***************</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Account Number</strong></TableCell>
                  <TableCell>1005675673</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Account Type</strong></TableCell>
                  <TableCell>Tax Client</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button variant="outlined">edit</Button>
            <Button variant="outlined">edit</Button>
            <Button variant="outlined">change email</Button>
            <Button variant="outlined">change username</Button>
            <Button variant="outlined">reset password</Button>
          </Box>

        </Box>

      </Container>
    </Stack>
  );
}