import React, { useState, useEffect, useRef, useMemo } from 'react'
import { customStyles as styles } from './CustomStyles'
import { FilterFooter } from '../FilterFooter'
import { StatusIndicator, LOADING } from 'js/components/ui/Spinner'
import { ReactComponent as DropdownIndicator } from './IconDropdownIndicator.svg'
import { components } from 'react-select'

const stopPropagation = ev => ev.stopPropagation()

/**
 * Transform string into color
 * @param {string} str 
 */
const stringToColour = (str = '') => {
  const hash = str
    .split('')
    .reduce((acc, curr) =>
      String.prototype.charCodeAt.call(curr) + ((acc << 5) - acc),
      ''
    )

  return 'rgb'
    .split('')
    .reduce((color, curr, index) => {
      const value = (hash >> (index * 8)) & 0xFF
      return color += ('00' + value.toString(16)).substr(-2)
    }, '#')
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
      Group,
      Menu: menu({ setMenuOpen, onApply })
    },
    styles
  }

  return (
    <div onClick={stopPropagation} tabIndex="0">
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

const Chevron = ({ isOpen }) => {
  const style = {
    transform: `rotate(${isOpen ? '0deg' : '-90deg'})`
  }
  return (
    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" style={style}>
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
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

  const onClick = () => onToggle(!toggled)
  const onCheckboxClick = e => {
    e.stopPropagation()
    onCheck(!isChecked)
  }

  return (
    <components.GroupHeading onClick={onClick} {...rest}>
      <Checkbox isChecked={isChecked} onClick={onCheckboxClick} />
      <HeadingIcon title={children} />
      {children}
      <Chevron isOpen={toggled} />
    </components.GroupHeading>
  )
}

/**
 * Group
 * @param {*} param0 
 */
const Group = props => {
  const [isChecked, setChecked] = useState(true)
  const [isOpen, setOpen] = useState(false)

  const { children, ...rest } = props

  useEffect(() => {
    const allSelected = props.options.map(op => op.isSelected).every(Boolean)
    setChecked(allSelected)
  }, [props.options])

  const onCheckClick = check => {
    setChecked(check)
    const values = props.getValue()

    const { data, setValue } = props
    if (!check) {
      const newvalue = values.filter(val => (
        !data.options.find(op => op.login === val.login)
      ))
      setValue(newvalue)
    } else {
      setValue([...values, ...data.options])
    }
  }

  const Heading = GroupHeading(onCheckClick, isChecked, setOpen, isOpen)
  return (
    <components.Group {...rest} Heading={Heading}>
      {isOpen && children}
    </components.Group>
  )
}

/**
 * Checkbox
 * @param {boolean} isChecked
 */
const Checkbox = ({ isChecked, onClick }) => {
  return (
    <svg width="18px" height="18px" viewBox="0 0 18 18" className="mr-2" onClick={onClick}>
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
    innerProps: { onMouseMove, onMouseOver, ...restInnerProps }, // remove mouse events
    label,
    isSelected
  } = props

  const newProps = {
    ...props,
    innerProps: { ...restInnerProps }
  }

  return (
    <components.Option {...newProps}>
      <Checkbox isChecked={isSelected} /> {label}
    </components.Option>
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

 /**
  * Map options to flat array
  * @param {Array} options 
  */
const extractOptions = options => {
  const [option] = options
  if (option && option.options) { //is a group
    return options.reduce((acc, curr) => {
      return [ ...acc, ...curr.options ]
    }, [])
  }
  return options
}

export const menu = ({ setMenuOpen, onApply }) => props => {
  const {
    children,
    clearValue,
    options,
    setValue,
    getValue
  } = props

  const allValues = getValue()
  
  const mappedOptions = extractOptions(options)

  const totalOptions = mappedOptions.reduce((acc, curr) => {
    acc.add(curr.login ? curr.login : curr)
    return acc
  }, new Set()).size

  const allSelected = allValues.length === totalOptions
  const toggleAll = () => {
    clearValue()
    if (!allSelected) {
      setValue(mappedOptions)
    }
  }
  return (
    <components.Menu {...props}>
      <div
        className="d-flex filter-dropdown-menu-all"
        onClick={toggleAll}
      >
        <Checkbox isChecked={allSelected} />
        <span>
          <span className="filter-dropdown-all">All</span>
          <span className="filter-dropdown-pill">
            {totalOptions}
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
    </components.Menu>
  )
}
