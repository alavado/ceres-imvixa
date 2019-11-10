import React from 'react';
import GraficoNiveles from '../GraficoNiveles';
import './../Anexos/Anexos.css'

const ImpactoRegulacion = ({mortalidadTotalImvixa, mortalidadTotalTradicional}) => {
  return (
    <>
      <h2>5. IMPACTOS DE REGULACIÓN</h2>
      <h3>5.1 Riesgo de disminución de siembra por clasificación de bioseguridad</h3>
      <GraficoNiveles
        mortalidades={{
          imvixa: mortalidadTotalImvixa,
          tradicional: mortalidadTotalTradicional
        }}
      />
      <div className="nota">
        Fuente: Reglamento N° 319 Subpesca.<br/>
        Fuente mortalidad: Mortalidad estimada por usuario más mortalidad por tratamientos.
      </div>
    </>
  );
};

export default ImpactoRegulacion;