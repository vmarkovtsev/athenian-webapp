import React, { useState, useEffect } from 'react'
import { brandColors } from './CustomStyles'
import { FilterFooter } from '../FilterFooter'
import Checkbox from 'js/components/ui/Checkbox'
import { StatusIndicator, LOADING } from 'js/components/ui/Spinner'
import { ReactComponent as DropdownIndicator } from './IconDropdownIndicator.svg'
import { components } from 'react-select'
import { github } from 'js/services/format'
import classNames from 'classnames'
/**
 * Transform string into color
 * @param {string} str
 */
const hashCode = str => {
  if (!str.length) return 0

  const hash = str.split('').reduce((hash, char) =>
    (((hash << 5) - hash) + char.charCodeAt(0) | 0),
    0
  )
  return hash >>> 0
}

const stringToColour = str => {
  if (stringToColour[str]) return stringToColour[str]

  const x = hashCode(str)
  const b = x % brandColors.length
  const l = 40 + (x % 40)

  stringToColour[str] = `hsl(${brandColors[b][0]}, ${brandColors[b][1]}%, ${l}%)`

  return stringToColour[str]
}

/**
 * CustomComponents used to override react-select components
 * @param {string} props.label
 * @param {boolean} props.isLoading
 * @param {boolean} props.isOpen
 * @param {number} props.count
 * @param {function} props.setMenuOpen 
 */
export const Dropdown = ({
  label,
  isLoading,
  isOpen,
  count,
  setMenuOpen,
  // onClose
}) => {
  const close = () => {
    setMenuOpen(!isOpen)
    // onClose(false)
  }

  return (
    <div className={`${classNames({ open: isOpen })} filter-dropdown align-items-center`} onClick={close}>
      <div className="d-flex align-items-center">
        <span className="filter-dropdown-label">{label}</span>
        {
          !isLoading ?
          <StatusIndicator size={5} status={LOADING} margin={0} /> :
          <span className="filter-dropdown-pill">{count}</span>
        }
      </div>
      <DropdownIndicator />
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
 * @param {boolean} props.isOpen 
 */
const Chevron = ({ isOpen }) => {
  const style = {
    transform: `rotate(${isOpen ? '0deg' : '-90deg'})`
  }
  return (
    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" style={style}>
      <path fill="#8889A1" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  )
}
/**
 * Group Heading
 * @param {*} param0
 */
const GroupHeading = (onCheck, isChecked, isIndeterminate, onToggle, toggled) => props => {
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
      <Checkbox isChecked={isChecked}
                isIndeterminate={isIndeterminate}
                onClick={onCheckboxClick} />
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
export const Group = props => {
  const [isChecked, setChecked] = useState(true)
  const [isIndeterminate, setIndeterminate] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const { children, ...rest } = props

  useEffect(() => {
    const allSelected = props.options.map(op => op.isSelected).every(Boolean)
    const someSelected = props.options.map(op => op.isSelected).some(Boolean)
    const indeterminateSelection = !allSelected && someSelected
    setChecked(someSelected)
    setIndeterminate(indeterminateSelection)
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

  const Heading = GroupHeading(onCheckClick, isChecked, isIndeterminate, setOpen, isOpen)
  return (
    <components.Group {...rest} Heading={Heading}>
      {isOpen && children}
    </components.Group>
  )
}

/**
 * Checkbox
 * @param {boolean} props.isChecked
 * @param {boolean} props.isIndeterminate
 * @param {function} props.onClick
 */
const Checkbox = ({ isChecked, isIndeterminate, onClick }) => {
  const mark = isChecked ? (
    isIndeterminate ?
      <rect stroke="#24C7CC" strokeWidth="1" x="3" y="7.375" width="10" height="1.25" fill="#24C7CC"></rect>
      :
      <polygon fill="#24C7CC" transform="translate(2.000000, 3.000000)" points="4.22898961 6.47146254 1.97497639 4.14922711 0.5 5.65814507 4.22898961 9.5 11.5 2.00891795 10.0354108 0.5"></polygon>
  ) : null

  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16" className="mr-2" onClick={onClick}>
      <rect stroke="#D6DBE4" strokeWidth="1" x="0" y="0" width="16" height="16" fill="#fff"></rect>
      {mark}
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
 * Placeholder
 */
export const Placeholder = props => {
  const { selectProps: { name } } = props
  return (
    <components.Placeholder {...props}>
      Search {name.toLowerCase()}...
    </components.Placeholder>
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

export const Menu = (onApply, setMenuOpen) => props => {
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

  const close = wasApplied => {
    setMenuOpen(false)
  }

  const apply = () => {
    onApply(allValues)
    close(true)
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
      <FilterFooter
        onCancel={() => close(false)}
        onAccept={apply}
        isAcceptable={allValues.length}
      />
    </components.Menu>
  )
}

export const usersLabelFormat = ({ name, login, avatar, picture }) => {
  const gituser = github.userName(login)
  const user = gituser || 'ANONYMOUS'
  return (
    <div className="align-items-center filter-dropdown-option">
      <img src={avatar || picture} alt={name} className="mr-2 filter-dropdown-option-img" />
      { name && <span className="filter-dropdown-option-name mr-1">{name}</span> }
      { user && user !== name && <span className={`filter-dropdown-option-user${!name ? '__dark' : ''} filter-dropdown-option-name mr-2`}>{user}</span> }
    </div>
  )
}
