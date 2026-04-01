const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export async function request(path, options = {}) {
  const url = API_BASE + path;

  let token = localStorage.getItem("token");

  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {})
    },
    credentials: "include"
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (res.status === 401) {
    try {
      const refreshRes = await fetch(API_BASE + "/auth/refresh", {
        method: "POST",
        credentials: "include"
      });

      const refreshData = await refreshRes.json();

      if (!refreshRes.ok) throw new Error("Refresh fallido");

      // guardar nuevo token
      localStorage.setItem("token", refreshData.accessToken);

      //  repetir request original
      res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshData.accessToken}`,
          ...(options.headers || {})
        },
        credentials: "include"
      });

      data = await res.json();

    } catch {
      // sesión expirada totalmente
      localStorage.clear();
      window.location.href = "/";
      return;
    }
  }

  if (!res.ok) {
    const msg = data?.message || res.statusText || "Error";
    const error = new Error(msg);
    error.status = res.status;
    error.response = data;
    throw error;
  }

  return data;
}