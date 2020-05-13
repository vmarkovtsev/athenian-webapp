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
  controlShouldRenderValue: false
}

export default function MultiSelect(multiSelectProps) {
  const {
    label,
    isLoading,
    noDataMsg,
    className,
    name,
    getOptionValue,
    getOptionLabel,
    options,
    onChange,
    onApply,
    value
  } = multiSelectProps

  return (
    <Dropdown label={label} isLoading={isLoading} onApply={onApply} value={value}>
      {ddProps => (
        ddProps.menuIsOpen &&
        <Select
          options={options}
          className={className}
          name={name}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          noOptionsMessage={formatMessage(noDataMsg)}
          loadingMessage={formatMessage('loading...')}
          onChange={onChange}
          value={value}
          {...defaultProps}
          {...ddProps} // components
        />
      )}
    </Dropdown>
  )
}
