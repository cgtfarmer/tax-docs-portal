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
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

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
          <Route path="app/" element={<AppLoggedIn />}>

            {/* need an index to route based on auth */}

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

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

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>
);
