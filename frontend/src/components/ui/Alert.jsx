export default function Alert({ message, type = "error" }) {
  if (!message) return null;

  const className =
    type === "success"
      ? "success-message-container"
      : "form-alert";

  return (
    <p
      className={className}
      role="alert"
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      {message}
    </p>
  );
}