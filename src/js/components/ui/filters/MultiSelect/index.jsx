import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Select from 'react-select'
import { Dropdown, Group, Placeholder, Option, Menu as CustomMenu } from './CustomComponents'
import { customStyles as styles } from './CustomStyles'

import _ from 'lodash'

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
    isLoading,
    options,
    initialValues,
    uniquenessKey
  } = multiSelectProps

  const [isMenuOpen, setMenuOpen] = useState(false)
  const initialCount = useRef(multiSelectSelectedCount(initialValues, uniquenessKey))
  const [currentCount, setCurrentCount] = useState(initialCount.current)

  const toggle = () => setMenuOpen(!isMenuOpen)
  const closeMenu = useCallback(() => {
    setCurrentCount(initialCount.current)
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const closeMenuIfNotThis = (e) => {
      if (!e.target.closest(`#multi-select-${label}`)) {
        closeMenu()
      }
    }

    const body = window.document.body
    body.addEventListener('click', closeMenuIfNotThis)
    return () => body.removeEventListener('click', closeMenuIfNotThis)
  }, [closeMenu, label])

  useEffect(() => {
    initialCount.current = multiSelectSelectedCount(initialValues, uniquenessKey)
    setCurrentCount(initialCount.current)
  }, [uniquenessKey, initialValues])

  const Menu = useMemo(() => CustomMenu(
    (values) => {
      onApply(values)
      setMenuOpen(false)
    }, closeMenu
  ), [closeMenu, onApply])

  const noData = formatMessage(noDataMsg)
  const loading = formatMessage('loading...')

  const onSelectionChange = (values) => {
    setCurrentCount(multiSelectSelectedCount(values, uniquenessKey))
  }

  return (
    <div id={`multi-select-${label}`}>
      <Dropdown
        label={label}
        isLoading={isLoading}
        count={currentCount}
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
         onChange={onSelectionChange}
         defaultValue={initialValues}
         components={{ Option, Placeholder, Group, Menu }}
         styles={styles}
         {...defaultProps}
       />
      }
    </div>
  )
}

const multiSelectSelectedCount = (values, uniquenessKey) => {
  if (!uniquenessKey) {
    return values.length;
  }

  return _(values).uniqBy(uniquenessKey).value().length;
}

export default MultiSelect
