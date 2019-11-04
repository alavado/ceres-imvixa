import React from 'react';
import GraficoNiveles from '../GraficoNiveles';

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
    </>
  );
};

export default ImpactoRegulacion;