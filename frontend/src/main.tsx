import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App.tsx";
import NotFound from "./pages/not-found/NotFound.tsx";
import Landing from "./pages/brochure/Landing.tsx";
import AppBrochure from "./AppBrochure.tsx";
import AppLoggedIn from "./AppLoggedIn.tsx";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ClientDashboard from "./pages/clients/ClientDashboard.tsx";
import ClientAccount from "./pages/clients/ClientAccount.tsx";
import AccountantHome from './pages/accountants/AccountantHome.tsx';
import AccountantMessageBoard from './pages/accountants/AccountantMessageBoard.tsx';
import ClientMessages from "./pages/clients/ClientMessages.tsx";
import ClientTasks from "./pages/clients/ClientTasks.tsx";
import AppAdmin from "./AppAdmin.tsx";
import Users from "./pages/users/Users.tsx";
import User from "./pages/users/User.tsx";
import NewUser from "./pages/users/NewUser.tsx";
import EditUser from "./pages/users/EditUser.tsx";
import Accountants from "./pages/accountants/Accountants.tsx";
import Accountant from "./pages/accountants/Accountant.tsx";
import Clients from "./pages/clients/Clients.tsx";
import Client from "./pages/clients/Client.tsx";
import NewClient from "./pages/clients/NewClient.tsx";
import EditClient from "./pages/clients/EditClient.tsx";
import ClientIndex from "./pages/clients/ClientIndex.tsx";
import AccountantHome from "./pages/accountants/AccountantHome.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not present");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>

          <Route index element={<Navigate to="welcome" replace />} />

          <Route path="welcome" element={<AppBrochure />}>
            <Route index element={<Landing />} />
          </Route>

          <Route path="app" element={<AppLoggedIn />}>

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route path="client" element={<ClientDashboard />}>
              <Route index element={<div />} />
              <Route path="account" element={<ClientAccount />} />
              <Route path="messages" element={<ClientMessages />} />
              <Route path="tasks" element={<ClientTasks />} />
            </Route>

          </Route>
          {/*
          <Route path="admin" element={<AppAdmin />} />

          <Route path="users">
            <Route index element={<Users />} />
            <Route path="new" element={<NewUser />} />
            <Route path=":userId">
              <Route index element={<User />} />
              <Route path="edit" element={<EditUser />} />
            </Route>
          </Route>

          <Route path="accountants">
            <Route index element={<Accountants />} />
            <Route path=":accountantId" element={<Accountant />} />
          </Route>

          <Route path="clients">
            <Route index element={<Clients />} />
            <Route path="new" element={<NewClient />} />
            <Route path=":clientId">
              <Route index element={<Client />} />
              <Route path="edit" element={<EditClient />} />
            </Route>
          </Route>

          <Route path="clientIndex" element={<ClientIndex />} />
          <Route path="accountant-home" element={<AccountantHome />} />

          <Route path="accountant-message-board">
            <Route index element={<AccountantMessageBoard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
