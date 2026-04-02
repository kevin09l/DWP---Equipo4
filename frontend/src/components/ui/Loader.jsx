export default function Loader({ message = "Cargando..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
      }}
    >
      <span>{message}</span>
    </div>
  );
}