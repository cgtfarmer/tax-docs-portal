import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import * as Pages from "./route-imports";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not present");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.App />}>

          {/* Brochure */}
          <Route element={<Pages.BrochureLayout />}>
            <Route index element={<Pages.Landing />} />
            <Route path="about" element={<Pages.About />} />
            <Route path="contact" element={<Pages.Contact />} />
            <Route path="services" element={<Pages.Services />} />
          </Route>

          {/* Auth */}
          <Route path="login" element={<Pages.LoginPage />} />

          {/* App */}
          <Route path="app">

            {/* Client */}
            <Route path="client" element={<Pages.AppLayout />}>
              <Route index element={<Pages.ClientDashboard />} />
              <Route path="account" element={<Pages.ClientAccount />} />
              <Route path="account/edit" element={<Pages.EditClientAccount />} />
              <Route path="messages" element={<Pages.ClientMessages />} />
              <Route path="tasks" element={<Pages.ClientTasks />} />
              <Route path="documents" element={<Pages.ClientDocuments />} />
            </Route>

            {/* Accountant */}
            <Route path="accountant" element={<Pages.AppLayout />}>
              <Route index element={<Pages.AccountantHome />} />
              <Route path="account" element={<Pages.AccountantAccount />} />
              <Route path=":accountantId/edit" element={<Pages.EditAccountantAccount />} />

              <Route path="clients">
                <Route index element={<Pages.AccountantClients />} />

                <Route path=":clientId">
                  <Route index element={<Pages.AccountantClient />} />

                  <Route path="messages" element={<Pages.AccountantClientMessages />} />

                  <Route path="tasks">
                    <Route index element={<Pages.AccountantClientTasks />} />
                    <Route path="create" element={<Pages.AccountantCreateTasks />} />
                  </Route>

                  <Route path="documents" element={<Pages.AccountantClientDocuments />} />
                </Route>
              </Route>
            </Route>

          </Route>

          {/* Admin */}
          <Route path="admin" element={<Pages.AppLayout />}>
            <Route index element={<Pages.AdminHome />} />

            <Route path="clients">
              <Route index element={<Pages.Clients />} />
              <Route path="new" element={<Pages.NewClient />} />

              <Route path=":clientId">
                <Route index element={<Pages.Client />} />
                <Route path="edit" element={<Pages.EditClient />} />
              </Route>
            </Route>

            <Route path="accountants">
              <Route index element={<Pages.Accountants />} />
              <Route path="new" element={<Pages.NewAccountant />} />

              <Route path=":accountantId">
                <Route index element={<Pages.Accountant />} />
                <Route path="edit" element={<Pages.EditAccountant />} />
              </Route>
            </Route>

            <Route path="admins">
              <Route index element={<Pages.Admins />} />
              <Route path="new" element={<Pages.NewAdmin />} />

              <Route path=":adminId">
                <Route index element={<Pages.Admin />} />
                <Route path="edit" element={<Pages.EditAdmin />} />
              </Route>
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Pages.NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);