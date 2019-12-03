import React from 'react'
import NumberFormat from 'react-number-format'

const CampoNumerico = props => <NumberFormat {...props} thousandSeparator={'.'} decimalSeparator={','} />

export default CampoNumerico