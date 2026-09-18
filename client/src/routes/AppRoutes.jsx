// src/routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Camera from "../pages/Camera";
import Preview from "../pages/Preview";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        {/* <Route path="/editor" element={<Editor />} /> */}
        <Route path="/preview" element={<Preview />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;