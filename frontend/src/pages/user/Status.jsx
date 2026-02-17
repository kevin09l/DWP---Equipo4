import { useRef, useEffect } from "react";

export default function Status() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div>
      <h1 ref={headingRef} tabIndex="-1">Status de Reportes</h1>

      <p>Reporte #1 - En revisión</p>
      <p>Reporte #2 - Resuelto</p>
    </div>
  );
}
