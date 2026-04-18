import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import ApiAccessor from "../../accessors/api-accessor";
import { ClientMapper } from "../../mapper/client-mapper";
import { ClientInput } from "../../models/client-input";

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
    height: "650px",
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
        marginTop: "20px",
    };
//The styling for the Login button
    const registerButtonStyle = {
    width: "240px",
    height: "55px",
    backgroundColor: "white",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    fontSize: "20px",
    marginTop: "10px",
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
    const loginHereLinkStyle = {
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
  );
}