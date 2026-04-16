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
import AccountantHome from './pages/accountants/AccountantHome.tsx';
import ClientMessages from "./pages/clients/ClientMessages.tsx";
import ClientTasks from "./pages/clients/ClientTasks.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not present");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          
          
          <Route index element={<Navigate to="welcome/" replace />} />

          <Route path="welcome/" element={<AppBrochure />}>

            <Route index element={<Landing />} />

          </Route>

          {/* webapp - login page + logged in clients and accountants */}
<<<<<<< HEAD
          <Route path="app" element={<AppLoggedIn />}>
||||||| 952fca6
          <Route path="app/" element={<AppLoggedIn />}>

            {/* need an index to route based on auth */}
=======
        
          <Route path="app" element={<AppLoggedIn />}>
>>>>>>> f8b6fe6a6924a8190e3003c0d95a5597a1cffc46

            {/* auth routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

<<<<<<< HEAD
            {/* client dashboard and nested account */}
            <Route path="client" element={<ClientDashboard />}>
              <Route path="account" element={<ClientAccount />} />
            </Route>

            {/*
            <Route path="accountant">
              <Route path="info" element={<AccountantInfo />} />
              <Route path="clients" element={<AccountantClients />} />
              <Route path="clients/:id" element={<AccountantClientDetail />} />
||||||| 952fca6
            {/*
            <Route path="taxpayer/" element={< />}>

              <Route path="docs" element={< />} />
              <Route path="meet" element={< />} />

            </Route>
            */}

            {/*
            <Route path="accountant/" element={< />}>

              <Route path="info" element={< />} />
              <Route path="clients" element={< />} />
              <Route path="clients/:id" element={< />} />
            
=======
            {/* client dashboard and nested account */}
            <Route path="client" element={<ClientDashboard />}>
              <Route path="account" element={<ClientAccount />} />
            
            <Route path="client" element={<ClientDashboard />}>
              <Route path="account" element={<ClientAccount />} />
              <Route path="messages" element={<ClientMessages />} />
              <Route path="tasks" element={<ClientTasks />} />
            </Route>

            {/*
            <Route path="accountant">
              <Route path="info" element={<AccountantInfo />} />
              <Route path="clients" element={<AccountantClients />} />
              <Route path="clients/:id" element={<AccountantClientDetail />} />
>>>>>>> f8b6fe6a6924a8190e3003c0d95a5597a1cffc46
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

          <Route path="accountant-home">
            <Route index element={<AccountantHome />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>
);
