import { Box, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import ApiAccessor from "../../accessors/api-accessor";
import { ClientMapper } from "../../mapper/client-mapper";
import { ClientInput } from "../../models/client-input";

import ModularNav from "../../components/layout/modular-navbar";


const apiAccessor = new ApiAccessor();
const clientMapper = new ClientMapper();

export default function RegisterPage() {

//state variables for email and password
const [clientInput, setClientInput] = useState<ClientInput>({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  passwordHash: "",
  accountantId: null
});

const [selectedTab, setSelectedTab] = useState<"taxpayer" | "accountant">("taxpayer");
const [registerError, setRegisterError] = useState("");


const handleRegister = async (): Promise<void> => {
  try {
    console.log("RegisterPage#handleRegister");
    setRegisterError("");

    if (selectedTab !== "taxpayer") {
      console.log("Accountant registration is not wired up yet.");
      return;
    }

    const existingClients = await apiAccessor.listClients();

    const emailExists = existingClients.some(
      (client) => client.email?.toLowerCase() === clientInput.email.toLowerCase()
    );

    const usernameExists = existingClients.some(
      (client) => client.username?.toLowerCase() === clientInput.username.toLowerCase()
    );

    if (emailExists || usernameExists) {
      setRegisterError("That username or email is already registered.");
      return;
    }

    const client = clientMapper.mapInputToModel(clientInput);

    await apiAccessor.createClient(client);

    navigate("/app/client/account/");
  } catch (error) {
    console.error("Registration failed:", error);
    setRegisterError("Something went wrong while registering.");
  }
};

//Creating navigation to LoginPage
const navigate = useNavigate();

//Entire Page Layout
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "60px",
  };
//Login Container
  const cardStyle = {
    width: "700px",
    height: "600px",
    backgroundColor: "#F7F7F7",
    border: "1px solid #000000",
    overflow: "hidden",
  };
//The styling that is used for everything under the tabs, Email, Password, Login Button and Register Text
    const formContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "90px",
    };
//The styling for the Login button
    const registerButtonStyle = {
    width: "240px",
    height: "55px",
    backgroundColor: "#ffffff",
    color: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    border: "1px solid #000000",
    fontSize: "20px",
    marginTop: "0px",
    cursor: "pointer",
    };
//The styling for the part that says "Don't have an account?"
    const dontHaveAnAccount = {
    marginTop: "20px",
    fontSize: "18px",
    color: "#9ca3af",
    };
//The styling for the register link
    const loginHereLinkStyle = {
    fontSize: "16px",
    color: "white",
    fontWeight: 500,
    cursor: "pointer",
    };

  return (
    <Stack sx={{ height: "100vh", padding: 0, margin: 0, }}>
      <ModularNav variant="login" />
      <Box sx={pageStyle}>
          <Box sx={cardStyle}>

          <Box sx={formContainerStyle}>
              <TextField
              label="First Name"
              variant="outlined"
              value={clientInput.firstName}
              onChange={(e) =>
                setClientInput((client) => ({
                  ...client,
                  firstName: e.target.value,
                }))
              }
              sx={{ width: "540px", 
                marginBottom: "20px", 
                backgroundColor: "#2a2a2a",
                input: { color: "white" },
                label: { color: "#9ca3af" },
              }}
              />
              <TextField
              label="Last Name"
              variant="outlined"
              value={clientInput.lastName}
              onChange={(e) =>
                setClientInput((client) => ({
                  ...client,
                  lastName: e.target.value,
                }))
              }
              sx={{ width: "540px", 
                marginBottom: "20px", 
                backgroundColor: "#2a2a2a",
                input: { color: "white" },
                label: { color: "#9ca3af" },
              }}           
              />
              <TextField
              label="Username"
              variant="outlined"
              value={clientInput.username}
              onChange={(e) =>
                setClientInput((client) => ({
                  ...client,
                  username: e.target.value,
                }))
              }
              sx={{ width: "540px", 
                marginBottom: "20px", 
                backgroundColor: "#2a2a2a",
                input: { color: "white" },
                label: { color: "#9ca3af" },
              }}           
              />
              <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              value={clientInput.email}
              onChange={(e) =>
                setClientInput((client) => ({
                  ...client,
                  email: e.target.value,
                }))
              }
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
              value={clientInput.passwordHash}
              onChange={(e) =>
                setClientInput((client) => ({
                  ...client,
                  passwordHash: e.target.value,
                }))
              }
              sx={{ width: "540px", 
                marginBottom: "20px", 
                backgroundColor: "#2a2a2a",
                input: { color: "white" },
                label: { color: "#9ca3af" },
              }}           
              />
              {registerError && (
                <Box sx={{ color: "#ff6b6b", fontSize: "16px", marginBottom: "10px" }}>
                  {registerError}
                </Box>
              )}
              <Box sx={registerButtonStyle} onClick={() => void handleRegister()}>
                  Register
              </Box>
              <Box sx={dontHaveAnAccount}>
                  Already have an account?
              </Box>
              <Box 
                  sx={loginHereLinkStyle}
                  onClick={() => navigate("/app/login")}
              >
                  Login Here
              </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}