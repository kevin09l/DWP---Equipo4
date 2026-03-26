// default base URL: when running in development we proxy /api to the
// backend so we can simply use a relative path. In production you can
// override via VITE_API_BASE_URL (e.g. http://localhost:3010/api or
// http://backend-dev:3010/api when inside Docker).
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

// debug help: log the resolved base url at startup
console.log("API base url:", API_BASE);

async function request(path, options = {}) {
  const url = API_BASE + path;
  console.log("fetching", url, options);
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send cookies (refresh token)
    ...options,
  });

  let payload;
  try {
    payload = await res.json();
  } catch (e) {
    // no json response
    payload = null;
  }

  if (!res.ok) {
    const msg = (payload && payload.message) || res.statusText || "Error en la petición";
    const error = new Error(msg);
    error.status = res.status;
    error.response = payload;
    throw error;
  }

  return payload;
}

export { request };

export const auth = {
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  logout: () => request("/auth/logout", { method: "POST", credentials: "include"}),
  logoutAll: () => request("/auth/logout-all", { method: "POST", credentials: "include" }),
  refresh: () => request("/auth/refresh", {method: "POST", credentials: "include"})
};
