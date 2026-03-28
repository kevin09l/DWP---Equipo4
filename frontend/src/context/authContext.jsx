import { createContext, useEffect, useState } from "react";
import { auth } from "../services/api";
import { useAuthChannel, sendLogout } from "../hooks/useAuthChannel";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        localStorage.setItem("token", res.accessToken);

        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        setIsAuthenticated(true);

      } catch {
        localStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.rol);

    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await auth.logout();
    } catch (e) {}

    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);

    sendLogout(); 
  };

  useAuthChannel(
    () => {
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
    },
    (role) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

