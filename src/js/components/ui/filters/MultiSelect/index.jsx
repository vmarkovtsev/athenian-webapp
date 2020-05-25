import React from 'react'
import Select from 'react-select'
import { Dropdown } from './CustomComponents'

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
    isLoading,
    noDataMsg,
    className,
    name,
    getOptionValue,
    getOptionLabel,
    options,
    onApply,
    value,
    onChange
  } = multiSelectProps

  const noData = formatMessage(noDataMsg)
  const loading= formatMessage('loading...')
  return (
    <Dropdown label={label} isLoading={isLoading} onApply={onApply} value={value}>
      {ddProps => (
        ddProps.menuIsOpen && <Select
          autoFocus
          options={options}
          className={className}
          name={name}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          noOptionsMessage={noData}
          loadingMessage={loading}
          value={value}
          onChange={onChange}
          {...defaultProps}
          {...ddProps} // components
        />
      )}
    </Dropdown>
  )
}

export default MultiSelect
