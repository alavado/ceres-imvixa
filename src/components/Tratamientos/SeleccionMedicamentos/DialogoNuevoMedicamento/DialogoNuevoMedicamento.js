import React, { useState } from 'react'
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
    color: '#6D4C41'
  })

  const agregarMedicamento = () => {
    dispatch(tratamientosActions.agregarMedicamento(medicamento))
  }

  return (
    <div>
      <button onClick={props.ocultar}>X</button>
      {props.formaFarmaceutica === FARMACO_APLICACION_BAÑO ?
        <CamposBano medicamento={medicamento} setMedicamento={setMedicamento} /> :
        <CamposOral medicamento={medicamento} setMedicamento={setMedicamento} />
      }
      <button onClick={agregarMedicamento}>Agregar</button>
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
        onValueChange={e => setMedicamento({ ...medicamento, costoUnitario: e.floatValue })}
      />
      <label htmlFor="nuevo-medicamento-principio">Principio activo</label>
      <input
        id="nuevo-medicamento-principio"
        onChange={e => setMedicamento({ ...medicamento, principioActivo: e.target.value })}
      />
      <label htmlFor="nuevo-medicamento-dosis">Presentación</label>
      <CampoNumerico
        id="nuevo-medicamento-dosis"
        onValueChange={e => setMedicamento({ ...medicamento, presentacion: e.floatValue })}
      />
      <label htmlFor="nuevo-medicamento-dosis">Dosis</label>
      <CampoNumerico
        id="nuevo-medicamento-dosis"
        onValueChange={e => setMedicamento({ ...medicamento, dosis: e.floatValue })}
      />
    </div>
  )
}

const CamposBano = ({ medicamento, setMedicamento }) => {
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
        onValueChange={e => setMedicamento({ ...medicamento, costoUnitario: e.floatValue })}
      />
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
