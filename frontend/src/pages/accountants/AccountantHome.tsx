import { Link } from "react-router";

export default function AccountantHome() {
  return (
    <div>
      <h1>Welcome, Mary Jane</h1>

      <Link to="/accountants/ef3620f9-e1fb-4017-9725-9a29cb368c8d">
        <button>My Account</button>
      </Link>

      <br />
      <br />

      <Link to="/clients">
        <button>View Clients</button>
      </Link>
    </div>
  );
}