import "./App.css";
import { Outlet } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { ProjectTheme } from "./ProjectTheme";

type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  role:
    | "ADMIN"
    | "ACCOUNTANT"
    | "CLIENT";
};

type AuthContextType = {
  user: AuthUser | null;
  login: (
    user: AuthUser
  ) => void;
  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside App provider"
    );
  }

  return context;
}

export default function App() {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "user"
      );

    if (saved) {
      setUser(
        JSON.parse(saved)
      );
    }
  }, []);

  function login(
    userData: AuthUser
  ) {
    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );
  }

  function logout() {
    setUser(null);

    localStorage.removeItem(
      "user"
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      <ThemeProvider
        theme={ProjectTheme}
      >
        <CssBaseline />

        <Outlet />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}