import React, { useState, useRef} from 'react';
import { connect } from 'react-redux'
import produccionActions from '../../../redux/produccion/actions'
import './CalculadoraVolumen.css'
import imagenRectangulo from '../../../assets/rectangulo.png'
import imagenCilindro from '../../../assets/cilindro.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CalculadoraVolumen = ({mostrar, fijarVolumenJaulaCilindrica, fijarVolumenJaulaRectangular}) => {

  const TIPO_RECTANGULAR = 'TIPO_RECTANGULAR'
  const TIPO_CILINDRICA = 'TIPO_CILINDRICA'
  const [tipo, setTipo] = useState(TIPO_RECTANGULAR)
  const anchoRectangulo = useRef(null)
  const largoRectangulo = useRef(null)
  const profundidadRectangulo = useRef(null)
  const diametroCilindro = useRef(null)
  const profundidadCilindro = useRef(null)

  const calcularVolumen = () => {
    if (tipo === TIPO_RECTANGULAR) {
      fijarVolumenJaulaRectangular(
        anchoRectangulo.current.value,
        largoRectangulo.current.value,
        profundidadRectangulo.current.value
      )
    }
    else {
      fijarVolumenJaulaCilindrica(
        diametroCilindro.current.value,
        profundidadCilindro.current.value
      )
    }
  }

  return (
    <div id="calculadora-volumen">
      <button>
        <FontAwesomeIcon icon={faTimes} onClick={() => mostrar(false)} size="sm" />
      </button>
      <div>
        <label htmlFor="tipo">Forma de la jaula</label>
        <label><input checked={tipo === TIPO_RECTANGULAR} type="radio" name="tipo" onClick={() => setTipo(TIPO_RECTANGULAR)} />Rectangular</label>
        <label><input checked={tipo === TIPO_CILINDRICA} type="radio" name="tipo" onClick={() => setTipo(TIPO_CILINDRICA)} />Cilíndrica</label>
      </div>
      <div id="formulario-calculadora-volumen">
        {tipo === TIPO_RECTANGULAR ?
          <>
            <img src={imagenRectangulo} alt="rectangulo" />
            <div className="campos-volumen-jaula">
              <label htmlFor="ancho-jaula">Ancho</label>
              <input ref={anchoRectangulo} id="ancho-jaula" type="number" />
              <label htmlFor="largo-jaula">Largo</label>
              <input ref={largoRectangulo} id="largo-jaula" type="number" />
              <label htmlFor="profundidad-jaula">Profundidad</label>
              <input ref={profundidadRectangulo} id="profundidad-jaula" type="number" />
            </div>
          </> :
          <>
            <img src={imagenCilindro} alt="cilindro" />
            <div className="campos-volumen-jaula">
              <label htmlFor="diametro-jaula">Diámetro</label>
              <input ref={diametroCilindro} id="diametro" type="number" />
              <label htmlFor="profundidad-jaula">Profundidad</label>
              <input ref={profundidadCilindro} id="profundidad-jaula" type="number" />
            </div>
          </>
        }
      </div>
      <button onClick={calcularVolumen}>Calcular</button>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  fijarVolumenJaulaCilindrica: (diametro, profundidad) => {
    const volumen = Math.floor(profundidad * Math.PI * (diametro / 2) ** 2)
    console.log(volumen);
    dispatch(produccionActions.fijarVolumenJaula(volumen))
  },
  fijarVolumenJaulaRectangular: (ancho, largo, profundidad) => {
    const volumen = Math.floor(ancho * largo * profundidad)
    console.log(volumen);
    dispatch(produccionActions.fijarVolumenJaula(volumen))
  }
})

export default connect(null, mapDispatchToProps)(CalculadoraVolumen);