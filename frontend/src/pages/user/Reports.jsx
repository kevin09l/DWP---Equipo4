import { useRef, useEffect } from "react";

export default function Reports() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="reports-page">
      
      <div className="reports-header">
        <h2 ref={headingRef} tabIndex="-1">Reportes de Agua</h2>
      </div>

      <p className="reports-description">
        Utiliza este formulario para reportar cualquier problema relacionado
        con el agua en tu área. Proporciona la dirección y una descripción
        detallada del problema, y nuestro equipo se pondrá en contacto contigo
        lo antes posible.
      </p>

      <div className="reports-form">
        <div className="form-group">
          <label>Dirección:</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Urgencia:</label>
          <select>
            <option value="">Selecciona una opción</option>
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label>Descripción del Reporte:</label>
          <textarea rows="4"></textarea>
        </div>

        <div className="reports-actions">
          <button className="btn-report">Realizar Reporte</button>
        </div>
      </div>
    </div>
  );
}
