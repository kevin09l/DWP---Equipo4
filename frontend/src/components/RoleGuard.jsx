import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function RoleGuard({ allowRoles = [], children }) {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  if (!allowRoles.includes(user.role)) return null;

  return children;
}