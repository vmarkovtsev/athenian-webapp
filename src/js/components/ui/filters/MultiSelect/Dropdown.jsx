import React from 'react'
import { DropdownIndicator } from './DropdownIndicator'

export const Dropdown = React.forwardRef(({ children, label, count, onClick }, ref) => {
  return (
    <div onClick={onClick}>
      <div ref={ref} style={{ cursor: 'pointer', background: 'white', border: '1px solid #dbdbdb', display: 'flex', padding: '8px 16px', position: 'relative', width: '250px', justifyContent: 'space-between' }}>
  <div><span style={{ fontSize: '14px', color: '#121343' }}>{label}</span> <span style={{ marginLeft: '8px', background: '#24C7CC', color: 'white', fontSize: '11px', padding: '2px 7px', borderRadius: '5px' }}>{count}</span></div><DropdownIndicator />
      </div>
      {children}
    </div>
  )
})