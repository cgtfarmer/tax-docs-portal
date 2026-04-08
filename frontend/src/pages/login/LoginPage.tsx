import { Box, TextField} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {

//state variables for email and password
const [email, setEmail] = useState("");
const [password, setPassword] = useState("")

//Login Function
const handleLogin = () => {
  console.log("Email:", email);
  console.log("Password:", password);
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
          <Box sx={{ ...tabStyle, backgroundColor: "#1f1f1f", color: "white" }}> 
            Taxpayer
          </Box>

          <Box
            sx={{
              ...tabStyle, //Taking Everything from tabStyle and adding some more styling
              backgroundColor: "#2a2a2a",
              color: "#9ca3af",
            }}
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
            <Box sx={loginButtonStyle} onClick={handleLogin}>
                Login
            </Box>
            <Box sx={dontHaveAnAccount}>
                Don't have an account?
            </Box>
            <Box 
            sx={registerLinkStyle}
            onClick={() => navigate("/app/register")}
            >
                Register here
            </Box>
        </Box>
      </Box>
    </Box>
  );
}