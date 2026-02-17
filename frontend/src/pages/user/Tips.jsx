import { useRef, useEffect } from "react";

export default function Tips() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="tips-page">
      
      <div className="tips-header">
        <h2 ref={headingRef} tabIndex="-1">Consejos de cuidados contra el agua</h2>
      </div>

     
      <div className="tips-list">
        <div className="tip-item">
          <h4>1. Repara Fugas</h4>
          <p>
            Asegúrate de reparar cualquier fuga en grifos y tuberías.
            Una pequeña fuga puede desperdiciar miles de litros de agua al año.
          </p>
        </div>

        <div className="tip-item">
          <h4>2. Usa el Agua de Manera Eficiente</h4>
          <p>
            Toma duchas más cortas y cierra el grifo mientras te cepillas
            los dientes. Esto ayudará a reducir el consumo innecesario de agua.
          </p>
        </div>

        <div className="tip-item">
          <h4>3. Riega las Plantas de Manera Inteligente</h4>
          <p>
            Riega tus plantas en las horas más frescas del día, como temprano
            por la mañana o al atardecer. Esto reduce la evaporación y asegura
            que más agua llegue a las raíces.
          </p>
        </div>
      </div>
    </div>
  );
}
