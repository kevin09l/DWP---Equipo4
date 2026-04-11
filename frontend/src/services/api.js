import { request } from "../utils/request";

export const auth = {
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  logout: () => request("/auth/logout", { method: "POST", credentials: "include"}),
  logoutAll: () => request("/auth/logout-all", { method: "POST", credentials: "include" }),
  refresh: () => request("/auth/refresh", {method: "POST", credentials: "include"}), 
  forgotPassword: (email) => request("/auth/forgot-password", { method: "POST" , body: JSON.stringify({ email })}), 
  resetPassword: (token, newPassword) => request("/auth/reset-password", { method: "POST", body: JSON.stringify({ token, newPassword })})
};

export const admin = {
  getReports: () => request("/admin/reports", { method: "GET", credentials: "include"}),
  approveReport: (id) => request(`/admin/approve-report/${id}`, { method: "POST", credentials: "include"}),
  getUsers: () => request("admin/users", { method: "GET", credentials: "include"})
};
