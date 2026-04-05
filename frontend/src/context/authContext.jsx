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
      setUser(null); // Aseguramos que sea null si no hay token
      setLoading(false);
      return;
    }

    try {
      // 1. Intentamos refrescar o verificar con el servidor
      const res = await auth.refresh(); 
      
      // 2. Guardamos el NUEVO token que nos dio el servidor
      localStorage.setItem("token", res.accessToken);

      // 3. ¡IMPORTANTE!: No confíes en el localStorage. 
      // Usa los datos que vienen directos de la respuesta del servidor (res.user)
      const userData = res.user || JSON.parse(localStorage.getItem("user"));
      
      if (userData) {
        setUser({
          ...userData,
          role: userData.role || userData.rol
        });
      } else {
        throw new Error("No user data");
      }

    } catch (error) {
      console.error("Sesión inválida:", error);
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

    localStorage.setItem("logoutMessage", "Sesión cerrada correctamente");

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

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
      value={{ user, loading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

