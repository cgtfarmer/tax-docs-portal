export { default as App } from "./App.tsx";
export { default as NotFound } from "./pages/NotFound.tsx";

/* brochure */
export { default as Landing } from "./pages/brochure/Landing.tsx";
export { default as About } from "./pages/brochure/About.tsx";
export { default as Contact } from "./pages/brochure/Contact.tsx";
export { default as Services } from "./pages/brochure/Services.tsx";

/* layouts */
export { default as AppLayout } from "./components/layout/AppLayout.tsx";
export { default as BrochureLayout } from "./components/layout/BrochureLayout.tsx";
// export { default as ClientLayout } from "./components/deprecated/ClientLayout.tsx";
// export { default as AccountantLayout } from "./components/deprecated/AccountantLayout.tsx";
// export { default as AdminLayout } from "./components/deprecated/AdminLayout.tsx";

/* auth */
export { default as LoginPage } from "./pages/auth/LoginPage.tsx";

/* client */
export { default as ClientDashboard } from "./pages/clients/ClientDashboard.tsx";
export { default as ClientAccount } from "./pages/clients/ClientAccount.tsx";
export { default as ClientMessages } from "./pages/clients/ClientMessages.tsx";
export { default as ClientTasks } from "./pages/clients/ClientTasks.tsx";
export { default as ClientDocuments } from "./pages/clients/ClientDocuments.tsx";

/* accountant */
export { default as AccountantHome } from "./pages/accountants/AccountantHome.tsx";
export { default as AccountantClients } from "./pages/accountants/AccountantClients.tsx";
export { default as AccountantClient } from "./pages/accountants/AccountantClient.tsx";
export { default as AccountantClientMessages } from "./pages/accountants/AccountantClientMessages.tsx";
export { default as AccountantClientTasks } from "./pages/accountants/AccountantClientTask.tsx";
export { default as AccountantCreateTasks } from "./pages/accountants/AccountantCreateTasks.tsx";
export { default as AccountantClientDocuments } from "./pages/accountants/AccountantClientDocuments.tsx";
export { default as AccountantAccount } from "./pages/accountants/AccountantAccount.tsx";
export { default as EditAccountantAccount } from "./pages/accountants/EditAccountantAccount.tsx";

/* admin */
export { default as AdminHome } from "./pages/admin/AdminHome.tsx";

/* admin clients */
export { default as Clients } from "./pages/admin/clients/Clients.tsx";
export { default as Client } from "./pages/admin/clients/Client.tsx";
export { default as NewClient } from "./pages/admin/clients/NewClient.tsx";
export { default as EditClient } from "./pages/admin/clients/EditClient.tsx";
export { default as EditClientAccount } from "./pages/clients/EditClientAccount.tsx";

/* admin accountants */
export { default as Accountants } from "./pages/admin/accountants/Accountants.tsx";
export { default as Accountant } from "./pages/admin/accountants/Accountant.tsx";
export { default as NewAccountant } from "./pages/admin/accountants/NewAccountant.tsx";
export { default as EditAccountant } from "./pages/admin/accountants/EditAccountant.tsx";

/* admin admins */
export { default as Admins } from "./pages/admin/admins/Admins.tsx";
export { default as Admin } from "./pages/admin/admins/Admin.tsx";
export { default as NewAdmin } from "./pages/admin/admins/NewAdmin.tsx";
export { default as EditAdmin } from "./pages/admin/admins/EditAdmin.tsx";
