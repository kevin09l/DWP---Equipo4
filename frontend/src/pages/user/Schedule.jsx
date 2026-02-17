import { useRef, useEffect } from "react";
import "../../styles/styles.css";

export default function Schedule() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="schedule-page">
   
      <div className="schedule-header">
        <h2 ref={headingRef} tabIndex="-1">Horarios</h2>
      </div>

      <div className="schedule-filter">
        <label>Colonia / zona:</label>
        <select>
          <option>Selecciona una zona</option>
          <option>Zona Norte</option>
          <option>Zona Centro</option>
          <option>Zona Sur</option>
        </select>
      </div>

      <div className="schedule-table-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th></th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sábado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="time-label">Antes del medio día</td>
              <td><span className="time-box">7:00 - 9:00</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td><span className="time-box">10:00 - 12:00</span></td>
              <td></td>
            </tr>

            <tr>
              <td className="time-label">Después del medio día</td>
              <td></td>
              <td></td>
              <td><span className="time-box">13:00 - 15:00</span></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
