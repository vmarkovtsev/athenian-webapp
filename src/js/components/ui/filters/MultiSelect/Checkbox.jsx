import React from 'react'

export const Checkbox = ({ isChecked }) => {
  return (
    <svg width="20px" height="20px" viewBox="0 0 20 20" style={{ marginRight: '8px' }}>
      <rect stroke="#D6DBE4" strokeWidth="1" x="0" y="0" width="18" height="18" fill="#fff"></rect>
      { isChecked && <polygon fill="#24C7CC" points="4.66692304 8.35872968 7.13673213 10.8903181 14.4025708 4 16 5.49137391 7.13673213 14 3 9.96982087"></polygon> }
    </svg>
  )
}
