import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
  return (
    <header className='header'>
      <FontAwesomeIcon icon={ faFileInvoice } />
      <h1>Invoice Generator</h1>
    </header>
  )
}

export default Header
