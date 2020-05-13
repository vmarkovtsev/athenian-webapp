import React from 'react'
import Select from 'react-select'
export { Dropdown } from './CustomComponents'

export default function MultiSelect({
  options,
  isReady,
  className,
  noDataMsg,
  labelFormat,
  getOptionValue,
  selectedState,
  onChange,
  ...props
}) {
  return (
    <Select
      isSearchable
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      controlShouldRenderValue={false}
      isLoading={!isReady}
      className={className}
      options={options}
      value={selectedState}
      onChange={onChange}
      noOptionsMessage={() => <em>{noDataMsg}</em>}
      loadingMessage={() => <em>loading...</em>}
      getOptionLabel={labelFormat}
      getOptionValue={getOptionValue}
      {...props}
    />
  )
}
