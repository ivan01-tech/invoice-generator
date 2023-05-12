import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CoustomMessage({ icon, message, color }) {
  return (
    <div className={ `coustom-message ${color}` } >
      <FontAwesomeIcon icon={ icon } />
      <span>
        { message }
      </span>
    </div>
  )
}

export default CoustomMessage
