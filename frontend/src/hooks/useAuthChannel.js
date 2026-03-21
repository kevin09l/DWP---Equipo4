import { useEffect } from "react";

const authChannel = new BroadcastChannel("auth");

export const useAuthChannel = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;

      if (!data) return;

      if (data.type === "logout") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        window.location.replace("/");
      }

      if (data.type === "login") {
        if (data.role === "admin") {
          window.location.replace("/admin/dashboard");
        } else {
          window.location.replace("/user/home");
        }
      }
    };

    authChannel.addEventListener("message", handleMessage);

    return () => {
      authChannel.removeEventListener("message", handleMessage);
    };
  }, []);
};

export const sendLogout = () => {
  authChannel.postMessage({ type: "logout" });
};

export const sendLogin = (role) => {
  authChannel.postMessage({
    type: "login",
    role,
  });
};