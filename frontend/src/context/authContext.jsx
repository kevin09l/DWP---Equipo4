import { createContext, useEffect, useState } from "react";
import { auth } from "../services/api";
import { useAuthChannel, sendLogout } from "../hooks/useAuthChannel";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await auth.refresh();
        // guardar nuevo token
        localStorage.setItem("token", res.accessToken);
        // obtener usuario guardado
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);

      } catch {
        localStorage.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);

    const normalizedUser = {
      ...data.user,
      role: data.user.role || data.user.rol
    }

    localStorage.setItem("user", JSON.stringify(normalizedUser));

    setUser(normalizedUser);
  };

  const logout = async () => {
    try {
      await auth.logout();
    } catch (e) {}

    localStorage.clear();
    setUser(null);

    sendLogout(); 
  };

  useAuthChannel(
    () => {
      localStorage.clear();
      setUser(null);
    },
    (role) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    }
  );

  return (
    <AuthContext.Provider
      value={{ user, loading, isAutheticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

