import { Routes, Route } from "react-router-dom";

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import CrudSchedules from "../pages/admin/CrudSchedules";
import CrudAnnouncements from "../pages/admin/CrudAnnouncements";
import ManageReports from "../pages/admin/ManageReports";
import CrudTips from "../pages/admin/CrudTips";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/schedules" element={<CrudSchedules />} />
      <Route path="/announcements" element={<CrudAnnouncements />} />
      <Route path="/reports" element={<ManageReports />} />
      <Route path="/tips" element={<CrudTips />} />
    </Routes>
  );
}
