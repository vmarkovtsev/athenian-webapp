import React, { useState, useEffect, useRef } from 'react'
import { customStyles as styles } from './CustomStyles'
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
      Placeholder,
      Menu: menu({ setMenuOpen, onApply })
    },
    styles
  }

  return (
    <div onClick={stopPropagation}>
      <div ref={ref} onClick={toggle} className='filter-dropdown align-items-center'>
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
    <svg width="16px" height="16px" viewBox="0 0 16 16" className="mr-2">
      <rect stroke="#D6DBE4" strokeWidth="1" x="0" y="0" width="16" height="16" fill="#fff"></rect>
      { isChecked &&
        <polygon fill="#24C7CC" transform="translate(2.000000, 3.000000)" points="4.22898961 6.47146254 1.97497639 4.14922711 0.5 5.65814507 4.22898961 9.5 11.5 2.00891795 10.0354108 0.5"></polygon>
      }
    </svg>
  )
}

/**
 * Option
 * @param {boolean} isSelected
 * @param {string} label
*/
export const Option = props => {
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
    gridTemplateColumns: '20px calc(100% - 16px)',
    gridColumnGap: 4,
    padding: "6px 12px"
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
export const Placeholder = props => {
  const { selectProps: { name } } = props
  const style = {
    ...props.getStyles('placeholder', props),
    paddingLeft: 22
  }
  return (
    <span style={style}>
      Search {name.toLowerCase()}...
    </span>
  )
}

/**
 * Menu
 */
export const menu = ({ setMenuOpen, onApply }) => props => {
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
    border: '1px solid #E7E7EC',
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
      { setMenuOpen && onApply && <FilterFooter
        onCancel={() => setMenuOpen(false)}
        onAccept={() => {
          onApply(allValues)
          setMenuOpen(false)
        }}
        isAcceptable={allValues.length > 0}
      /> }
    </div>
  )
}
