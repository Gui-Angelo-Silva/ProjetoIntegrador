import React from 'react'

const CancelButton = ({ action }) => {
  return (
    <button className="btn btn-light w-full" onClick={action}>
        Cancelar
    </button>
  )
}

export default CancelButton