import React from 'react'
import NumberFormat from 'react-number-format'

const CampoNumerico = props => <NumberFormat {...props} thousandSeparator={'.'} decimalSeparator={','} isAllowed={value => value.floatValue >= 10}/>

export default CampoNumerico