import { forwardRef } from "react";

const Input = forwardRef(
  ({ id, type = "text", value, onChange, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
    );
  }
);

export default Input;