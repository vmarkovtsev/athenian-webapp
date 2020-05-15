import React, { useState, useEffect, useRef } from 'react'
import { customStyles } from './CustomStyles'
import { FilterFooter } from '../FilterFooter'
import { StatusIndicator, LOADING } from 'js/components/ui/Spinner'
import { ReactComponent as DropdownIndicator } from './DropdownIndicator.svg'

/**
 * CustomComponents used to override react-select components
 * @param {function} children
 * @param {string} label
 * @param {boolean} isLoading
 * @param {function} onApply
 * @param {Array} value
 */
const stopPropagation = ev => ev.stopPropagation()

export const Dropdown = ({
  children,
  label,
  isLoading,
  onApply,
  value
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const ref = useRef(null)

  const toggle = () => setMenuOpen(!isMenuOpen)

  const closeAll = ev => {
    if (!ref.current.contains(ev.target)) setMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', closeAll)
    return () => {
      window.removeEventListener('click', closeAll)
    }
  }, [])

  const childrenProps = {
    menuIsOpen: isMenuOpen,
    components: {
      Option,
      Placeholder: placeholder(label),
      Menu: menu({ setMenuOpen, onApply })
    },
    styles: customStyles(label)
  }

  return (
    <div onClick={stopPropagation}>
      <div ref={ref} onClick={toggle} className='filter-dropdown'>
        <div className="d-flex align-items-center">
          <span className="filter-dropdown-label">{label}</span>
          {
            !isLoading ?
            <StatusIndicator size={5} status={LOADING} margin={0} /> :
            <span className="filter-dropdown-pill">{value.length}</span>
          }
        </div>
        <DropdownIndicator />
      </div>
      {children(childrenProps)}
    </div>
  )
}

/**
 * Checkbox
 * @param {boolean} isChecked
 */
const Checkbox = ({ isChecked }) => {
  return (
    <svg width="20px" height="20px" viewBox="0 0 20 20" className="mr-2">
      <rect stroke="#D6DBE4" strokeWidth="1" x="0" y="0" width="18" height="18" fill="#fff"></rect>
      { isChecked &&
        <polygon fill="#24C7CC" points="4.66692304 8.35872968 7.13673213 10.8903181 14.4025708 4 16 5.49137391 7.13673213 14 3 9.96982087"></polygon>
      }
    </svg>
  )
}

/**
 * Option
 * @param {boolean} isSelected
 * @param {string} label
*/
const Option = props => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
    label,
    isSelected
  } = props

  const style = {
    ...getStyles('option', props),
    display: 'grid',
    alignItems: 'center',
    borderBottom: '1px solid #D6DBE4',
    gridTemplateColumns: '20px auto',
    gridColumnGap: 8
  }

  return (
    <div ref={ref} style={style} {...restInnerProps}>
      <Checkbox isChecked={isSelected} /> {label}
    </div>
  )
}

/**
 * Placeholder,
 * @param {string} label
 * @return {function} 
 */
const placeholder = label => props => {
  const style = {
    ...props.getStyles('placeholder', props),
    paddingLeft: 22
  }
  return (
    <span style={style}>
      Search {label.toLowerCase()}...
    </span>
  )
}

/**
 * Menu
 */
const menu = ({ setMenuOpen, onApply }) => props => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
    children,
    clearValue,
    options,
    setValue,
    getValue
  } = props

  const style = {
    ...getStyles('menu', props),
    boxShadow: 'none',
    border: '1px solid #ccc',
    borderTopWidth: 0
  }
  const allValues = getValue()
  const allSelected = allValues.length === options.length

  return (
    <div ref={ref} {...restInnerProps} style={style}>
      <div
        className="d-flex filter-dropdown-menu-all"
        onClick={() => {
          clearValue()
          if (!allSelected) {
            setValue(options)
          }
        }}
      >
        <Checkbox isChecked={allSelected} />
        <span>
          <span className="filter-dropdown-all">All</span>
          <span className="filter-dropdown-pill">
            {options.length}
          </span>
        </span>
      </div>
      {children}
      <FilterFooter
        onCancel={() => setMenuOpen(false)}
        onAccept={() => {
          onApply(allValues)
          setMenuOpen(false)
        }}
        isAcceptable={allValues.length > 0}
      />
    </div>
  )
}
