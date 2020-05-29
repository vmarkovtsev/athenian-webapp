import React, { useState, useRef, useMemo } from 'react'
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
    onClose,
    isLoading,
    options,
    value,
  } = multiSelectProps

  const [isMenuOpen, setMenuOpen] = useState(false)
  const noData = formatMessage(noDataMsg)
  const loading= formatMessage('loading...')
  const ref = useRef()

  const toggle = e => {
    const menu = ref.current.querySelector('.filter')
    // if click inside menu, skip toggle
    if (menu && menu.contains(e.target)) {
      e.stopPropagation()
      return
    }
    setMenuOpen(!isMenuOpen)
  }

  const closeAll = e => {
    if (!ref.current.contains(e.target)) {
      setMenuOpen(false)
    }
  }

  useMountEffect(() => {
    window.addEventListener('click', closeAll)
    return () => {
      window.removeEventListener('click', closeAll)
    }
  }, [])

  /**
   * @param {function} onApply
   * @param {function} setMenuOpen
   */
  const Menu = useMemo(() => CustomMenu(
    (values) => {
      onApply(values)
      // onClose(true)
    },
    (wasApplied) => {
      // onClose(wasApplied)
      setMenuOpen()
    }), [onApply])

  return (
    <div ref={ref} onClick={toggle}>
      <Dropdown
        label={label}
        isLoading={isLoading}
        count={value.length}
        setMenuOpen={setMenuOpen}
        isOpen={isMenuOpen}
        onClose={onClose}
      />
      {isMenuOpen &&
        <Select
          menuIsOpen
          autoFocus
          options={options}
          className={className}
          name={name}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          noOptionsMessage={noData}
          loadingMessage={loading}
          onChange={onChange}
          value={value}
          components= {{ Option, Placeholder, Group, Menu }}
          styles={styles}
          {...defaultProps}
        />
      }
    </div>
  )
}

export default MultiSelect
