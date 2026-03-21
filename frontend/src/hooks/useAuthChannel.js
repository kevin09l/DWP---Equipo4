import { useEffect } from "react";

const authChannel = new BroadcastChannel("auth");

export const useAuthChannel = (onLogout, onLogin) => {
  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;

      if (!data) return;

      if (data.type === "logout") {
        onLogout?.();
      }

      if (data.type === "login") {
        onLogin?.(data.role);
      }
    };

    authChannel.addEventListener("message", handleMessage);

    return () => {
      authChannel.removeEventListener("message", handleMessage);
    };
  }, [onLogout, onLogin]);
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