import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {

  return (

    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/documents" element={<Documents />} />

        <Route path="/upload" element={<Upload />} />

        <Route path="/profile" element={<Profile />} />

      </Route>

    </Routes>

  );

}

export default App;