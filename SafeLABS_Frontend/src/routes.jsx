import React from "react";
import { Routes, Route} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import DatabasePage from "./pages/DatabasePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import TermsPage from "./pages/Terms.jsx";
import ProtectedRoute from "./components/route/protectedRoute.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<LoginPage/>}/>
      <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/settings" element={<SettingsPage />} />

        </Route>
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;