//import { Link } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../../App";

export default function AccountantHome() {
  
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  if (user.role !== "ACCOUNTANT") {
    return <Navigate to="/" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.firstName}{" "}{user.lastName}</h1>
    </div>
  );
}
