import React, { useEffect, useState, useRef } from 'react'
import Select from 'react-select'
import { FilterFooter} from '../FilterFooter'
import { Checkbox } from './Checkbox'
import { Dropdown } from './Dropdown'
import { customStyles } from './CustomStyles'
import SearchIcon from './SearchIcon'

// It is not needed a more formal definition because the options passed to MultiSelect
// in our case are arrays of primitives, or arrays of simple objects [{foo <primitive|array>,...}, ...]
const deepCopy = obj => JSON.parse(JSON.stringify(obj))

export default function MultiSelect({ name, options, isReady, id, className, noDataMsg, labelFormat, onChange, getOptionValue }) {
  const [selectedState, setSelectedState] = useState([])
  const [isOpen, setOpen] = useState(false)
  const howMany = selectedState.length === options.length || selectedState.length === 0 ? 'all' : selectedState.length
  const ref = useRef(null)

  const toggle = () => setOpen(false)

  useEffect(() => {
    setSelectedState(options)
    window.addEventListener('click', toggle)
    return () => {
      window.removeEventListener('click', toggle)
    }
  }, [options])

  const [previousSelectionState, setPreviousSelectionState] = useState(deepCopy(options).sort())

  const Search = name => {
    return () => (
      <div style={{ display: 'flex' }}>
        <SearchIcon />
        <span>Find {name.toLowerCase()}...</span>
      </div>
    )
  }

  const Option = props => {
    const {
      getStyles,
      innerProps: { ref, ...restInnerProps },
      label,
      isSelected
    } = props
    const style = {
      ...getStyles('option', props),
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #D6DBE4'
    }
    return (<div ref={ref} {...restInnerProps} style={style}><Checkbox isChecked={isSelected}/>{label}</div>)
  }

  const Menu = props => {
    const {
      getStyles,
      innerProps: { ref, ...restInnerProps },
      children,
      clearValue,
      options,
      setValue
    } = props
    const style = {
      ...getStyles('menu', props),
      boxShadow: 'none',
      border: '1px solid #ccc',
      borderTopWidth: 0
    }
  
    const allSelected = selectedState.length === options.length
  
    return (
      <div ref={ref} {...restInnerProps} style={style}>
        <div
          style={{ padding: '8px 12px', background: '#E7E7EC', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => {
            clearValue()
            if (!allSelected) {
              setValue(options)
            }
          }}
        >
          <Checkbox isChecked={allSelected} /> <span style={{ color: '#121343' }}>All</span>
        </div>
        {children}
        <FilterFooter
          onCancel={() => setOpen(false)}
          onAccept={() => {
            onChange(selectedState)
            setOpen(false)
          }}
          isAcceptable={selectedState.length > 0}
        />
      </div>
    )
  }

  return (
    <Dropdown
      ref={ref}
      label={name}
      count={selectedState.length}
      onClick={ev => {
        ev.stopPropagation()
        if (ev.target === ref.current) {
          setOpen(!isOpen)
        }
      }}
    >
      { isOpen && <Select
        components={{
          DropdownIndicator: () => null,
          Option,
          Menu,
          Placeholder: Search(name)
        }}
        menuIsOpen={isOpen}
        isClearable={false}
        isSearchable
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        controlShouldRenderValue={false}
        isLoading={!isReady}
        id={id}
        className={className}
        options={options}
        openMenuOnClick={false}
        value={selectedState}
        onChange={setSelectedState}
        aria-labelledby={`${id}Label`}
        noOptionsMessage={() => <em>{noDataMsg}</em>}
        loadingMessage={() => <em>loading...</em>}
        getOptionLabel={labelFormat}
        getOptionValue={getOptionValue}
        styles={customStyles(name)}
      /> }
    </Dropdown>
  )
}
