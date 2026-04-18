import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import NotFound from "./pages/NotFound.tsx";
import Landing from "./pages/brochure/Landing.tsx";
import BrochureLayout from "./components/layout/BrochureLayout.tsx";
import ClientLayout from "./components/layout/ClientLayout.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import ClientDashboard from "./pages/clients/ClientDashboard.tsx";
import ClientAccount from "./pages/clients/ClientAccount.tsx";
import ClientMessages from "./pages/clients/ClientMessages.tsx";
import ClientTasks from "./pages/clients/ClientTasks.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx";
import Clients from "./pages/admin/clients/Clients.tsx";
import Client from "./pages/admin/clients/Client.tsx";
import NewClient from "./pages/admin/clients/NewClient.tsx";
import EditClient from "./pages/admin/clients/EditClient.tsx";
import Accountants from "./pages/admin/accountants/Accountants.tsx";
import Accountant from "./pages/admin/accountants/Accountant.tsx";
import AdminHome from './pages/admin/AdminHome.tsx';
import AccountantLayout from './components/layout/AccountantLayout.tsx';
import AccountantHome from './pages/accountants/AccountantHome.tsx';
import AccountantMessageBoard from './pages/accountants/AccountantClientMessages.tsx';
import AccountantClients from './pages/accountants/AccountantClients.tsx';
import AccountantAccount from './pages/accountants/AccountantAccount.tsx';
import AccountantClientMessages from './pages/accountants/AccountantClientMessages.tsx';
import AccountantClientTasks from './pages/accountants/AccountantClientTasks.tsx';
import AccountantClientDocuments from './pages/accountants/AccountantClientDocuments.tsx';
import AccountantClient from './pages/accountants/AccountantClient.tsx';
import About from './pages/brochure/About.tsx';
import Contact from './pages/brochure/Contact.tsx';
import Services from './pages/brochure/Services.tsx';
import ClientDocuments from './pages/clients/ClientDocuments.tsx';
// import RegisterPage from "./pages/register/RegisterPage";
// import AccountantHome from './pages/accountants/AccountantHome.tsx';
// import AccountantMessageBoard from './pages/accountants/AccountantMessageBoard.tsx';
// import Users from "./pages/users/Users.tsx";
// import User from "./pages/users/User.tsx";
// import NewUser from "./pages/users/NewUser.tsx";
// import EditUser from "./pages/users/EditUser.tsx";
// import ClientIndex from "./pages/clients/ClientIndex.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not present");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>

          <Route element={<BrochureLayout />}>
            <Route index element={<Landing />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
          {/* <Route path="register" element={<RegisterPage />} /> */}

          <Route path="app">
            <Route path="client" element={<ClientLayout />}>
              <Route index element={<ClientDashboard />} />
              <Route path="account" element={<ClientAccount />} />
              <Route path="messages" element={<ClientMessages />} />
              <Route path="tasks" element={<ClientTasks />} />
              <Route path="documents" element={<ClientDocuments />} />
            </Route>

            <Route path="accountant" element={<AccountantLayout />}>
              <Route index element={<AccountantHome />} />

              <Route path="clients">
                <Route index element={<AccountantClients />} />

                <Route path=":clientId">
                  <Route index element={<AccountantClient />} />
                  <Route path="messages" element={<AccountantClientMessages />} />
                  <Route path="tasks" element={<AccountantClientTasks />} />
                  <Route path="documents" element={<AccountantClientDocuments />} />
                </Route>
              </Route>

              <Route path="messages" element={<AccountantMessageBoard />} />
              <Route path="account" element={<AccountantAccount />} />
            </Route>
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />

            <Route path="clients">
              <Route index element={<Clients />} />
              <Route path="new" element={<NewClient />} />
              <Route path=":clientId">
                <Route index element={<Client />} />
                <Route path="edit" element={<EditClient />} />
              </Route>
            </Route>

            <Route path="accountants">
              <Route index element={<Accountants />} />
              <Route path=":accountantId" element={<Accountant />} />
            </Route>
          </Route>

          {/*
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="new" element={<NewUser />} />
            <Route path=":userId">
              <Route index element={<User />} />
              <Route path="edit" element={<EditUser />} />
            </Route>
          </Route>

          <Route path="clientIndex" element={<ClientIndex />} />
          */}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
