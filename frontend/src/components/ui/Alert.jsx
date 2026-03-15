export default function Alert({ message, type = "error" }) {

  const className =
    type === "success"
      ? "success-message-container"
      : "form-alert";

  return (
    <p
      className={className}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </p>
  );
}