import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Home from "./pages/home/Home.tsx";
import NotFound from "./pages/not-found/NotFound.tsx";
import Users from './pages/users/Users.tsx';
import User from './pages/users/User.tsx';
import NewUser from './pages/users/NewUser.tsx';
import EditUser from './pages/users/EditUser.tsx';
import Clients from './pages/clients/Clients.tsx';
import ClientIndex from './pages/clients/ClientIndex.tsx';
import Client from './pages/clients/Client.tsx';
import NewClient from './pages/clients/NewClient.tsx';
import EditClient from './pages/clients/EditClient.tsx'; 
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not present");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="users">
            <Route index element={<Users />} />

            <Route path="new" element={<NewUser />} />

            <Route path=":userId">
              <Route index element={<User />} />

              <Route path="edit" element={<EditUser />} />
            </Route>
          </Route>

          <Route path="clients">
            <Route index element={<Clients />} />

            <Route path="new" element={<NewClient />} />

            <Route path=":clientId">
              <Route index element={<Client />} />

              <Route path="edit" element={<EditClient />} />
            </Route>
          </Route>  
          
          <Route path="clientIndex">
            <Route index element={<ClientIndex />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>
);
