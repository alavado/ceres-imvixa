import React, { useState, useEffect } from 'react'
import './DialogoNuevoMedicamento.css'
import { useDispatch } from 'react-redux'
import tratamientosActions from '../../../../redux/tratamientos/actions'
import CampoNumerico from '../../../Produccion/CampoNumerico'
import { COSTO_OPERACIONAL_BAÑO, FARMACO_APLICACION_BAÑO } from '../../../../helpers/constantes'

const DialogoNuevoMedicamento = props => {

  const dispatch = useDispatch()
  const [medicamento, setMedicamento] = useState({
    nombre: 'Deltafav',
    formaFarmaceutica: props.formaFarmaceutica,
    principioActivo: 'Deltametrina',
    unidad: 'lt',
    costoUnitario: 500,
    costoOperacional: COSTO_OPERACIONAL_BAÑO,
    dosisBaño: 0.0003,
    unidadDosis: 'ml/m3',
    cantidadPorJaula: 0.3,
    mortalidad: 0.06,
    activo: true,
    color: '#6D4C41'
  })

  useEffect(() => {
    setMedicamento({...medicamento, formaFarmaceutica: props.formaFarmaceutica})
  }, [props.formaFarmaceutica])

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
        {props.formaFarmaceutica === FARMACO_APLICACION_BAÑO ?
          <CamposBano medicamento={medicamento} setMedicamento={setMedicamento} /> :
          <CamposOral medicamento={medicamento} setMedicamento={setMedicamento} />
        }
        <button onClick={() => {
          console.log(medicamento)
          dispatch(tratamientosActions.agregarMedicamento(medicamento))
          props.ocultar()
        }}>Agregar</button>
      </div>
    </div>
  )
}

const CamposOral = ({ medicamento, setMedicamento }) => {
  return (
    <div>
      <h2>Nuevo medicamento de aplicación oral</h2>
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
  return (
    <div>
      <h2>Nuevo medicamento de aplicación externa</h2>
      <label htmlFor="nuevo-medicamento-nombre">Nombre comercial</label>
      <input
        id="nuevo-medicamento-nombre"
        onChange={e => setMedicamento({ ...medicamento, nombre: e.target.value })}
      />
      <div className="input-con-unidades">
        <label htmlFor="nuevo-medicamento-costo">Costo unitario</label>
        <CampoNumerico
          id="nuevo-medicamento-costo"
          onValueChange={e => setMedicamento({ ...medicamento, costoUnitario: e.floatValue })}
        />
        <input
          type="radio"
          name="unidades-costo"
          defaultChecked={true}
          onChange={e => setMedicamento({ ...medicamento, unidad: 'lt', unidadDosis: 'ml/m3' })}
        />USD/lt
        <input
          type="radio"
          name="unidades-costo"
          onChange={e => setMedicamento({ ...medicamento, unidad: 'kg', unidadDosis: 'mg/m3' })}
        />USD/kg
      </div>
      <label htmlFor="nuevo-medicamento-principio">Principio activo</label>
      <input
        id="nuevo-medicamento-principio"
        onChange={e => setMedicamento({ ...medicamento, principioActivo: e.target.value })}
      />
      <label htmlFor="nuevo-medicamento-volumen">Volumen de agua por baño</label>
      <CampoNumerico
        id="nuevo-medicamento-volumen"
        onValueChange={e => setMedicamento({ ...medicamento, volumen: e.floatValue })}
      />
      <label htmlFor="nuevo-medicamento-dosis">Cantidad por jaula</label>
      <CampoNumerico
        id="nuevo-medicamento-dosis"
        onValueChange={e => setMedicamento({ ...medicamento, cantidadPorJaula: e.floatValue })}
      />
    </div>
  )
}

export default DialogoNuevoMedicamento
