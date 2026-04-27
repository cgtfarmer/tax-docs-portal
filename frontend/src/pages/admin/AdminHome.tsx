import { Container } from "@mui/material";
import { Navigate } from "react-router";
import { useAuth } from "../../App";

export default function Page() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return (
    <Container className="mt-3">
      <h1>
        Admin Home
      </h1>

      <p>
        Welcome back{" "}
        {user.firstName}{" "}
        {user.lastName}
      </p>

      <p>
        You are logged in as{" "}
        {user.role}.
      </p>

      <p>
        Lorem ipsum dolor sit amet,
        consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Container>
  );
}