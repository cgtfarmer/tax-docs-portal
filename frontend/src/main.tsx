import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.tsx";
import NotFound from "./pages/NotFound.tsx";

// Brochure
import Landing from "./pages/brochure/Landing.tsx";
import BrochureLayout from "./components/layout/BrochureLayout.tsx";
import About from './pages/brochure/About.tsx';
import Contact from './pages/brochure/Contact.tsx';
import Services from './pages/brochure/Services.tsx';

// Auth
import LoginPage from "./pages/auth/LoginPage.tsx";

// Client
import ClientLayout from "./components/layout/ClientLayout.tsx";
import ClientDashboard from "./pages/clients/ClientDashboard.tsx";
import ClientAccount from "./pages/clients/ClientAccount.tsx";
import ClientMessages from "./pages/clients/ClientMessages.tsx";
import ClientTasks from "./pages/clients/ClientTasks.tsx";
import ClientDocuments from './pages/clients/ClientDocuments.tsx';

// Admin
import AdminLayout from "./components/layout/AdminLayout.tsx";
import AdminHome from './pages/admin/AdminHome.tsx';
import Clients from "./pages/admin/clients/Clients.tsx";
import Client from "./pages/admin/clients/Client.tsx";
import NewClient from "./pages/admin/clients/NewClient.tsx";
import EditClient from "./pages/admin/clients/EditClient.tsx";

import Accountants from "./pages/admin/accountants/Accountants.tsx";
import Accountant from "./pages/admin/accountants/Accountant.tsx";
import NewAccountant from "./pages/admin/accountants/NewAccountant.tsx";
import EditAccountant from "./pages/admin/accountants/EditAccountant.tsx";

import Admins from "./pages/admin/admins/Admins.tsx";
import Admin from "./pages/admin/admins/Admin.tsx";
import NewAdmin from "./pages/admin/admins/NewAdmin.tsx";
import EditAdmin from "./pages/admin/admins/EditAdmin.tsx";

// Accountant
import AccountantLayout from './components/layout/AccountantLayout.tsx';
import AccountantHome from './pages/accountants/AccountantHome.tsx';
import AccountantAccount from './pages/accountants/AccountantAccount.tsx';
import EditAccountantAccount from './pages/accountants/EditAccountantAccount.tsx';

import AccountantClients from './pages/accountants/AccountantClients.tsx';
import AccountantClient from './pages/accountants/AccountantClient.tsx';
import AccountantClientMessages from './pages/accountants/AccountantClientMessages.tsx';
import AccountantClientTasks from './pages/accountants/AccountantClientTasks.tsx';
import AccountantClientDocuments from './pages/accountants/AccountantClientDocuments.tsx';

import AccountantMessageBoard from './pages/accountants/AccountantClientMessages.tsx';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not present");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>

          {/* Brochure */}
          <Route element={<BrochureLayout />}>
            <Route index element={<Landing />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
          </Route>

          {/* Auth */}
          <Route path="login" element={<LoginPage />} />

          {/* App */}
          <Route path="app">

            {/* Client */}
            <Route path="client" element={<ClientLayout />}>
              <Route index element={<ClientDashboard />} />
              <Route path="account" element={<ClientAccount />} />
              <Route path="messages" element={<ClientMessages />} />
              <Route path="tasks" element={<ClientTasks />} />
              <Route path="documents" element={<ClientDocuments />} />
            </Route>

            {/* Accountant */}
            <Route path="accountant" element={<AccountantLayout />}>
              <Route index element={<AccountantHome />} />

              <Route path="account" element={<AccountantAccount />} />
              <Route path=":accountantId/edit" element={<EditAccountantAccount />} />

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
            </Route>

          </Route>

          {/* Admin */}
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
              <Route path="new" element={<NewAccountant />} />
              <Route path=":accountantId">
                <Route index element={<Accountant />} />
                <Route path="edit" element={<EditAccountant />} />
              </Route>
            </Route>

            <Route path="admins">
              <Route index element={<Admins />} />
              <Route path="new" element={<NewAdmin />} />
              <Route path=":adminId">
                <Route index element={<Admin />} />
                <Route path="edit" element={<EditAdmin />} />
              </Route>
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);