import React, { useState, useEffect, useRef, useMemo } from 'react'
import { customStyles as styles } from './CustomStyles'
import { FilterFooter } from '../FilterFooter'
import { StatusIndicator, LOADING } from 'js/components/ui/Spinner'
import { ReactComponent as DropdownIndicator } from './DropdownIndicator.svg'
import { components } from 'react-select'

const stopPropagation = ev => ev.stopPropagation()

var stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

/**
 * CustomComponents used to override react-select components
 * @param {function} children
 * @param {string} label
 * @param {boolean} isLoading
 * @param {function} onApply
 * @param {Array} value
 */
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
      // GroupHeading,
      Group,
      Menu: menu({ setMenuOpen, onApply })
    },
    styles
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
 * Create icon using the first letter
 * @param {string} props.title
 */
const HeadingIcon = ({ title }) => {
  const [letter] = title
  const style = {
    background: stringToColour(title)
  }
  return (
    <div className="filter-dropdown-option-prefix" style={style}>
      {letter.toUpperCase()}
    </div>
  )
}

/**
 * Group Heading
 * @param {*} param0 
 */
const GroupHeading = (onCheck, isChecked, onToggle, toggled) => props => {
  const {
    children,
    ...rest
  } = props
  const style = {
    ...props.getStyles('groupHeading', props),
    display: 'flex',
    alignItems: 'center'
  }
  return (
    <components.GroupHeading onClick={() => onToggle(!toggled)} {...rest} style={style}>
      <Checkbox isChecked={isChecked} onClick={e => {
        e.stopPropagation()
        onCheck(!isChecked)
      }} />
      <HeadingIcon title={children} />
      {children}
    </components.GroupHeading>
  )
}

/**
 * Group
 * @param {*} param0 
 */
const Group = props => {
  const [isSelected, setSelected] = useState(true)
  const [isOpen, setOpen] = useState(false)
  const {
    children,
    ...rest
  } = props

  return (
    <components.Group {...rest} Heading={GroupHeading(setSelected, isSelected, setOpen, isOpen)}>
      {isOpen && children}
    </components.Group>
  )
}

/**
 * Checkbox
 * @param {boolean} isChecked
 */
const Checkbox = ({ isChecked }) => {
  return (
    <svg width="18px" height="18px" viewBox="0 0 18 18" className="mr-2">
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
    border: '1px solid #ccc',
    borderTopWidth: 0
  }

  const allValues = getValue()
  const totalOptions = useMemo(() => {
    return options.reduce((acc, curr) => {
      const { options } = curr
      if (options) return options.length + acc
      return acc + 1
    }, 0)
  }, [options])

  const allSelected = allValues.length === totalOptions

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
