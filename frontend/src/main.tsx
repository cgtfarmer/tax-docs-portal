import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App.tsx";
//import Home from "./pages/home/Home.tsx";
import NotFound from "./pages/not-found/NotFound.tsx";
import Users from './pages/users/Users.tsx';
import User from './pages/users/User.tsx';
import NewUser from './pages/users/NewUser.tsx';
import EditUser from './pages/users/EditUser.tsx';
import Landing from "./pages/brochure/Landing.tsx";
import AppLoggedIn from "./AppLoggedIn.tsx";
import AppAdmin from "./AppAdmin.tsx";
import AppBrochure from "./AppBrochure.tsx";
import Accountants from './pages/accountants/Accountants.tsx';
import Accountant from './pages/accountants/Accountant.tsx';
import Clients from './pages/clients/Clients.tsx';
import ClientIndex from './pages/clients/ClientIndex.tsx';
import Client from './pages/clients/Client.tsx';
import NewClient from './pages/clients/NewClient.tsx';
import EditClient from './pages/clients/EditClient.tsx'; 
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ClientDashboard from "./pages/clients/ClientDashboard.tsx";
import ClientAccount from "./pages/clients/ClientAccount.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not present");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          
          {/*<Route index element={<Home />} />*/}

          {/* index redirects to landing page (only brochure element as of the time of writing) */}
          <Route index element={<Navigate to="welcome/" replace />} />

          <Route path="welcome/" element={<AppBrochure />}>

            <Route index element={<Landing />} />

          </Route>

          {/* webapp - login page + logged in clients and accountants */}
          <Route path="app" element={<AppLoggedIn />}>

            {/* auth routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* client dashboard and nested account */}
            <Route path="client" element={<ClientDashboard />}>
              <Route path="account" element={<ClientAccount />} />
            </Route>

            {/*
            <Route path="accountant">
              <Route path="info" element={<AccountantInfo />} />
              <Route path="clients" element={<AccountantClients />} />
              <Route path="clients/:id" element={<AccountantClientDetail />} />
            </Route>
            */}
          </Route>

          {/* admin - logged in admins only */}
          <Route path="admin/" element={<AppAdmin />}>

            {/*
            <Route path="profile" element={< />} />

            <Route path="clients" element={< />} />
            <Route path="clients/:id" element={< />} />

            <Route path="accountants" element={< />} />
            <Route path="accountants/:id" element={< />} />
            */}
          
          </Route>

          {/* demo paths - remove eventually */}
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
          
          <Route path="clientIndex">
            <Route index element={<ClientIndex />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>
);
