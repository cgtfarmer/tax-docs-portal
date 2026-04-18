import { Link } from "react-router";

export default function AccountantHome() {
  return (
    <div>
      <h1>Welcome, Mary Jane</h1>

      <Link to="/app/accountant/account">
        <button>My Account</button>
      </Link>

      <br />
      <br />

      <Link to="/app/accountant/clients">
        <button>View Clients</button>
      </Link>
    </div>
  );
}
