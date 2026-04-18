import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import ApiAccessor from "../../accessors/api-accessor";

const apiAccessor = new ApiAccessor();

export default function LoginPage() {

//state variables for email and password
const [email, setEmail] = useState("");
const [password, setPassword] = useState("")
const [selectedTab, setSelectedTab] = useState<"taxpayer" | "accountant">("taxpayer");
const [loginError, setLoginError] = useState("");

//Login Function
const handleLogin = async (): Promise<void> => {
  try {
    console.log("LoginPage#handleLogin");
    setLoginError("");

    if (selectedTab !== "taxpayer") {
      console.log("Accountant login is not wired up yet.");
      return;
    }

    const existingClients = await apiAccessor.listClients();

    const matchingClient = existingClients.find(
      (client) =>
        (client.email?.toLowerCase() === email.toLowerCase() ||
          client.username?.toLowerCase() === email.toLowerCase()) &&
        client.passwordHash === password
    );

    if (!matchingClient) {
      setLoginError("You don't have an account.");
      return;
    }

    navigate("/app/client/account/");
  } catch (error) {
    console.error("Login failed:", error);
    setLoginError("Something went wrong while logging in.");
  }
};

//Creating navigation to Register Page
const navigate = useNavigate();
//Entire Page Layout
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
//The styling for the Header - Also making it below the NavBar for now
    const headerStyle = {
    position: "absolute" as const,
    top: "10px",
    left: "60px",
    right: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    };
//The styling for TSoA
    const logoTextStyle = {
    fontSize: "22px",
    fontWeight: 600,
    color: "white",
    };
//The styling for the Navigation portion in the top right
    const navStyle = {
    display: "flex",
    gap: "30px",
    fontSize: "22px",
    fontWeight: 500,
    color: "#d1d5db",
    };
//Login Container
  const cardStyle = {
    width: "700px",
    height: "500px",
    backgroundColor: "#1f1f1f",
    border: "1px solid #3a3a3a",
    borderRadius: "16px",
    overflow: "hidden",
  };
//The row that holds both of our tabs
  const tabRowStyle = {
    display: "flex",
    width: "100%",
    height: "80px",
  };
//The shared Styling for Both of the tabs - Different styling is added to the boxes
  const tabStyle = {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: 500,
    cursor: "pointer",
  };
//The styling that is used for everything under the tabs, Email, Password, Login Button and Register Text
    const formContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "70px",
    };
//The styling for the Login button
    const loginButtonStyle = {
    width: "240px",
    height: "55px",
    backgroundColor: "white",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    fontSize: "20px",
    marginTop: "20px",
    cursor: "pointer",
    fontWeight: 600,
    };
//The styling for the part that says "Don't have an account?"
    const dontHaveAnAccount = {
    marginTop: "20px",
    fontSize: "18px",
    color: "#9ca3af",
    };
//The styling for the register link
    const registerLinkStyle = {
    fontSize: "16px",
    color: "white",
    fontWeight: 500,
    cursor: "pointer",
    };

  return (
    <Box sx={pageStyle}>
        <Box sx={headerStyle}>
            <Box sx={logoTextStyle}>
                TSoA
            </Box>
          <Box
            sx={{
              ...navStyle,
              cursor: "pointer",
              "&:hover": {
                color: "white",
              },
            }}
            onClick={() => navigate("/welcome")}
          >
            Brochure
          </Box>
        </Box>
      <Box sx={cardStyle}>
        <Box sx={tabRowStyle}>
          <Box
            sx={{
              ...tabStyle,
              backgroundColor: selectedTab === "taxpayer" ? "#1f1f1f" : "#2a2a2a",
              color: selectedTab === "taxpayer" ? "white" : "#9ca3af",
            }}
            onClick={() => setSelectedTab("taxpayer")}
          >
            Taxpayer
          </Box>

          <Box
            sx={{
              ...tabStyle,
              backgroundColor: selectedTab === "accountant" ? "#1f1f1f" : "#2a2a2a",
              color: selectedTab === "accountant" ? "white" : "#9ca3af",
            }}
            onClick={() => setSelectedTab("accountant")}
          >
            Accountant
          </Box>
        </Box>

        <Box sx={formContainerStyle}>
            <TextField
            label="Username / Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "540px",
              marginBottom: "20px",
              backgroundColor: "#2a2a2a",
              input: { color: "white" },
              label: { color: "#9ca3af" },
            }}
            />
            <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "540px",
              marginBottom: "20px",
              backgroundColor: "#2a2a2a",
              input: { color: "white" },
              label: { color: "#9ca3af" },
            }}
            />
            {loginError && (
              <Box sx={{ color: "#ff6b6b", fontSize: "14px", marginBottom: "5px" }}>
                {loginError}
              </Box>
            )}
            <Box sx={loginButtonStyle} onClick={() => void handleLogin()}>
                Login
            </Box>
            <Box sx={dontHaveAnAccount}>
                Don't have an account?
            </Box>
            <Box
            sx={registerLinkStyle}
            onClick={() => navigate("/register")}
            >
                Register here
            </Box>
        </Box>
      </Box>
    </Box>
  );
}
