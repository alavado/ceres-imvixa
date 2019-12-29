import React, { useState, useEffect } from 'react'
import './DialogoNuevoMedicamento.css'
import { useDispatch, useSelector } from 'react-redux'
import tratamientosActions from '../../../../redux/tratamientos/actions'
import CampoNumerico from '../../../Produccion/CampoNumerico'
import { COSTO_OPERACIONAL_BAÑO, FARMACO_APLICACION_BAÑO } from '../../../../helpers/constantes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const medicamentoInicial = {
  nombre: '',
  formaFarmaceutica: FARMACO_APLICACION_BAÑO,
  principioActivo: '',
  unidad: 'lt',
  costoUnitario: 0,
  costoOperacional: COSTO_OPERACIONAL_BAÑO,
  dosisBaño: 0.0003,
  unidadDosis: 'ml/m3',
  cantidadPorJaula: 0,
  mortalidad: 0.06,
  activo: true,
  color: '#6D4C41'
}

const DialogoNuevoMedicamento = props => {

  const dispatch = useDispatch()
  const [medicamento, setMedicamento] = useState(medicamentoInicial)

  useEffect(() => {
    setMedicamento({
      ...medicamentoInicial,
      formaFarmaceutica: props.formaFarmaceutica
    })
  }, [props.formaFarmaceutica])
  
  const esBaño = props.formaFarmaceutica === FARMACO_APLICACION_BAÑO

  return (
    <div
      className="fondo-oscuro" 
      style={{
        opacity: props.mostrar ? 1 : 0,
        pointerEvents: props.mostrar ? 'all' : 'none'
      }}
      onClick={props.ocultar}
    >
      <div
        className={props.mostrar ? 'dialogo' : 'dialogo-oculto'}
        onClick={e => e.stopPropagation()}
      >
        <div className="dialogo-encabezado"> 
          <h2>Nuevo medicamento de aplicación {esBaño ? 'externa' : 'oral'}</h2>
          <button className="boton-cerrar-dialogo" onClick={props.ocultar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {esBaño ?
          <CamposBano medicamento={medicamento} setMedicamento={setMedicamento} /> :
          <CamposOral medicamento={medicamento} setMedicamento={setMedicamento} />
        }
        <button
          disabled={medicamento.nombre === '' || medicamento.costoUnitario === 0 || medicamento.principioActivo === ''}
          onClick={() => {
            dispatch(tratamientosActions.agregarMedicamento(medicamento))
            props.ocultar()
          }}
        >Agregar</button>
      </div>
    </div>
  )
}

const CamposOral = ({ medicamento, setMedicamento }) => {
  return (
    <div>
      <label htmlFor="nuevo-medicamento-nombre">Nombre comercial</label>
      <input
        id="nuevo-medicamento-nombre"
        onChange={e => setMedicamento({ ...medicamento, nombre: e.target.value })}
      />
      <label htmlFor="nuevo-medicamento-costo">Costo unitario</label>
      <CampoNumerico
        id="nuevo-medicamento-costo"
        suffix=" USD/kg"
        onValueChange={e => setMedicamento({ ...medicamento, costoUnitario: e.floatValue })}
      />
      <label htmlFor="nuevo-medicamento-principio">Nombre principio activo</label>
      <input
        id="nuevo-medicamento-principio"
        onChange={e => setMedicamento({ ...medicamento, principioActivo: e.target.value })}
      />
      <label htmlFor="nuevo-medicamento-dosis">Presentación (% principio activo)</label>
      <CampoNumerico
        id="nuevo-medicamento-dosis"
        suffix=" %"
        onValueChange={e => setMedicamento({ ...medicamento, presentacion: e.floatValue })}
      />
      <label htmlFor="nuevo-medicamento-dosis">Dosis producto comercial por kg de peso</label>
      <CampoNumerico
        id="nuevo-medicamento-dosis"
        suffix=" mg/kg"
        onValueChange={e => setMedicamento({ ...medicamento, dosis: e.floatValue })}
      />
    </div>
  )
}

const CamposBano = ({ medicamento, setMedicamento }) => {

  const volumenJaula = useSelector(state => state.produccion.volumenJaula)

  return (
    <div>
      <label htmlFor="nuevo-medicamento-nombre">Nombre comercial</label>
      <input
        id="nuevo-medicamento-nombre"
        onChange={e => setMedicamento({ ...medicamento, nombre: e.target.value })}
      />
      <label htmlFor="nuevo-medicamento-costo">Costo unitario</label>
      <div className="input-con-unidades">
        <CampoNumerico
          id="nuevo-medicamento-costo"
          onValueChange={e => setMedicamento({ ...medicamento, costoUnitario: e.floatValue })}
        />
        <div className="contenedor-radios">
          <input
            type="radio"
            name="unidades-costo"
            id="unidades-costo-lt"
            defaultChecked={true}
            onChange={e => setMedicamento({ ...medicamento, unidad: 'lt', unidadDosis: 'ml/m3' })}
          /><label for="unidades-costo-lt" className="label-radio">USD/lt</label>
          <input
            type="radio"
            name="unidades-costo"
            id="unidades-costo-kg"
            onChange={e => setMedicamento({ ...medicamento, unidad: 'kg', unidadDosis: 'mg/m3' })}
          /><label for="unidades-costo-kg" className="label-radio">USD/kg</label>
        </div>
      </div>
      <label htmlFor="nuevo-medicamento-principio">Principio activo</label>
      <input
        id="nuevo-medicamento-principio"
        onChange={e => setMedicamento({ ...medicamento, principioActivo: e.target.value })}
      />
      <label htmlFor="nuevo-medicamento-volumen">Volumen de agua por baño</label>
      <CampoNumerico
        id="nuevo-medicamento-volumen"
        defaultValue={volumenJaula}
        suffix=" m3"
        onValueChange={e => setMedicamento({ ...medicamento, volumen: e.floatValue })}
      />
      <label htmlFor="nuevo-medicamento-dosis">Dosis producto comercial</label>
      <CampoNumerico
        id="nuevo-medicamento-dosis"
        suffix={` ${medicamento.unidadDosis}`}
        onValueChange={e => setMedicamento({ ...medicamento, cantidadPorJaula: e.floatValue })}
      />
    </div>
  )
}

export default DialogoNuevoMedicamento
