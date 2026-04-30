import { Box, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router";
import ApiAccessor from "../../accessors/api-accessor";
import ModularNav from "../../components/layout/modular-navbar";
import { useAuth } from "../../App";

const apiAccessor = new ApiAccessor();



export default function LoginPage() {
/* for password visablity */
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();
const handleMouseUpPassword = (e: React.MouseEvent) => e.preventDefault();

const navigate = useNavigate();
const { login } = useAuth();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
//const [selectedTab, setSelectedTab] = useState<"taxpayer" | "accountant">("taxpayer");
const [loginError, setLoginError] = useState("");

const handleLogin = async (): Promise<void> => {
  try {
    console.log("LoginPage#handleLogin");
    setLoginError("");

    const result = await apiAccessor.authorize(email, password);

    if (!result.success) {
      setLoginError(result.message || "Login failed.");
      return;
    }

    login({
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      role: result.role
    });

    if (result.role === "ADMIN") {
      void navigate("/admin");
    }
    if (result.role === "ACCOUNTANT") {
      void navigate("/app/accountant");
    }
    if (result.role === "CLIENT") {
      void navigate("/app/client/");
    }
    else {
      setLoginError("Unknown role.");
    }
  }
  catch (error) {

    console.error("Login failed:", error);

    setLoginError(
      error instanceof Error ? error.message : "Something went wrong while logging in."
    );
  }
};

  const pageStyle = {
    flexGrow: 1,
    backgroundColor: "transparent",
    alignSelf: "center",
    justify: "center",
    marginTop: "200px"
  };

  const cardStyle = {
    width: "500px",
    height: "300px",
    border: "1px solid #E0E0E0",
    overflow: "hidden"
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px"
  };

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
    cursor: "pointer"
  };

  return (
    <Box
      sx={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      padding: 0,
      margin: 0
      }}
    >
      <ModularNav variant="login" />

      <Box sx={pageStyle}>

        <Box sx={cardStyle}>

          <Box sx={formContainerStyle}>
            <FormControl sx={{ width: "300px", marginBottom: "20px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
              <OutlinedInput
                label="Email"
                id="outlined-adornment-password"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}

              />
            </FormControl>

            <FormControl sx={{ width: "300px", marginBottom: "20px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
                onKeyDown={(e) => { if (e.key === "Enter") void handleLogin(); }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              sx={loginButtonStyle}
              onClick={() => void handleLogin()}
            >
              Login
            </Button>

            {loginError && (
              <Box
                sx={{
                color: "#ff6b6b",
                fontSize: "14px",
                marginTop: "10px"
                }}
                >
                {loginError}
              </Box>
            )}


          </Box>
        </Box>
      </Box>
    </Box>
  );
}
