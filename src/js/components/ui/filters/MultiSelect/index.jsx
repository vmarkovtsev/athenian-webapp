import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import { Dropdown, Group, Placeholder, Option, Menu as CustomMenu } from './CustomComponents'
import { customStyles as styles } from './CustomStyles'
import { useMountEffect } from 'js/hooks'

const formatMessage = message => () => <em>{message}</em>

const defaultProps = {
  backspaceRemovesValue: false,
  closeMenuOnSelect: false,
  isClearable: false,
  openMenuOnClick: false,
  isSearchable: true,
  isMulti: true,
  hideSelectedOptions: false,
  controlShouldRenderValue: false,
  tabSelectsValue: false
}

const MultiSelect = multiSelectProps => {
  const {
    label,
    noDataMsg,
    className,
    name,
    getOptionValue,
    getOptionLabel,
    onApply,
    onChange,
    isLoading,
    options,
    value,
    count,
  } = multiSelectProps

  const [isMenuOpen, setMenuOpen] = useState(false)

  useMountEffect(() => {
    const close = e => setMenuOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  })

  const toggle = () => setMenuOpen(!isMenuOpen)

  const Menu = useMemo(() => CustomMenu(
    (values) => {
      onApply(values)
      setMenuOpen(false)
    },
    () => setMenuOpen(false)
  ), [onApply])

  const noData = formatMessage(noDataMsg)
  const loading= formatMessage('loading...')

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown
        label={label}
        isLoading={isLoading}
        count={count}
        onClick={toggle}
        isOpen={isMenuOpen}
      />
      {isMenuOpen &&
       <Select
         menuIsOpen={isMenuOpen}
         autoFocus={isMenuOpen}
         options={options}
         className={className}
         name={name}
         getOptionLabel={getOptionLabel}
         getOptionValue={getOptionValue}
         noOptionsMessage={noData}
         loadingMessage={loading}
         onChange={onChange}
         value={value}
         components={{ Option, Placeholder, Group, Menu }}
         styles={styles}
         {...defaultProps}
       />
      }
    </div>
  )
}

export default MultiSelect
