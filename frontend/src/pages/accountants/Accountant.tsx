import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router';
import { Alert, Box, CircularProgress, Link, Paper, Typography } from '@mui/material';
import ApiAccessor from '../../accessors/api-accessor';
import { Accountant } from '../../models/accountant';

const apiAccessor = new ApiAccessor();

export default function Page() {
  const { accountantId } = useParams();
  const [accountant, setAccountant] = useState<Accountant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccountant() {
      try {
        if (!accountantId) {
          setError('No accountant ID provided.');
          return;
        }

        const data = await apiAccessor.getAccountant(accountantId);
        setAccountant(data);
      } catch (err) {
        setError('Failed to load accountant.');
      } finally {
        setLoading(false);
      }
    }

    void fetchAccountant();
  }, [accountantId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!accountant) {
    return <Alert severity="warning">Accountant not found.</Alert>;
  }

  return (
    <>
      <Typography component="h1" variant="h4" gutterBottom>
        Accountant Details
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {accountant.firstName} {accountant.lastName}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Typography><strong>ID:</strong> {accountant.id}</Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography><strong>First Name:</strong> {accountant.firstName}</Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography><strong>Last Name:</strong> {accountant.lastName}</Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography><strong>Email:</strong> {accountant.email}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography><strong>Username:</strong> {accountant.username}</Typography>
        </Box>

        <Link component={RouterLink} to="/accountants">
          Back to Accountants
        </Link>
      </Paper>
    </>
  );
}