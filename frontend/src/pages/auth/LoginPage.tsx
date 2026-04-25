import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import ApiAccessor from "../../accessors/api-accessor";
import ModularNav from "../../components/layout/modular-navbar";


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

    const result = await apiAccessor.authorize(email, password);

    if (!result.success) {
      setLoginError(result.message || "Login failed.");
      return;
    }

    if (result.role === "ADMIN") {
      navigate("/admin");
    } else if (result.role === "ACCOUNTANT") {
      navigate("/app/accountant");
    } else if (result.role === "CLIENT") {
      navigate("/app/client/account");
    } else {
      setLoginError("Unknown role.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    setLoginError(error instanceof Error ? error.message : "Something went wrong while logging in.");
  }
};

//Creating navigation to Register Page
const navigate = useNavigate();

//Entire Page Layout
  const pageStyle = {
    flexGrow: "1",
    backgroundColor: "transparent",
    alignSelf: "center",
    justify: "center",
    marginTop: "200px"
  };
//Login Container
  const cardStyle = {
    width: "500px",
    height: "300px",
    backgroundColor: "#F7F7F7",
    border: "1px solid #000000",
    overflow: "hidden",
  };
//The styling that is used for everything under the tabs, Email, Password, Login Button and Register Text
    const formContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
    };
//The styling for the Login button
    const loginButtonStyle = {
    width: "200px",
    height: "45px",
    backgroundColor: "#ffffff",
    color: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    border: "1px solid #000000",
    fontSize: "20px",
    marginTop: "0px",
    cursor: "pointer",
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", padding: 0, margin: 0, }}>
      <ModularNav variant="login" />
      <Box sx={pageStyle}>
        <Box sx={cardStyle}>
          <Box sx={formContainerStyle}>
              <TextField
              label="Username / Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "300px", 
                marginBottom: "20px", 
                backgroundColor: "#E6E6E6",
                input: { color: "#000000" },
                label: { color: "#9ca3af" },
              }}
              />
              <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "300px", 
                marginBottom: "20px", 
                backgroundColor: "#E6E6E6",
                input: { color: "#000000" },
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
