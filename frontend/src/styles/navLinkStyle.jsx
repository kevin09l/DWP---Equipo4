export const navLinkStyle = ({ isActive }) => ({
  background: isActive ? "#2563eb" : "transparent",
  color: isActive ? "white" : "black",
  padding: "6px 10px",
  borderRadius: "4px",
  textDecoration: "none",
  fontWeight: isActive ? "bold" : "normal",
});
