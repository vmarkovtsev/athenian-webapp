import React from 'react'

const Checkbox = ({ isChecked, onClick, label }) => {
  return (
    <label className="d-flex align-iteams-center checkbox">
      <svg width="16px" height="16px" viewBox="0 0 16 16" onClick={onClick}>
        <rect stroke="#D6DBE4" strokeWidth="1" x="0" y="0" width="16" height="16" fill="#fff"></rect>
        { isChecked &&
          <polygon fill="#24C7CC" transform="translate(2.000000, 3.000000)" points="4.22898961 6.47146254 1.97497639 4.14922711 0.5 5.65814507 4.22898961 9.5 11.5 2.00891795 10.0354108 0.5"></polygon>
        }
      </svg>
      { label && <span className="checkbox-label">{label}</span>}
    </label>
  )
}

export default Checkbox
