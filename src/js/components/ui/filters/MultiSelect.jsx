import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import deepEqual from 'deep-equal';

import AriaLabel from 'js/components/ui/AriaLabel';

// It is not needed a more formal definition because the options passed to MultiSelect
// in our case are arrays of primitives, or arrays of simple objects [{foo <primitive|array>,...}, ...]
const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default function MultiSelect({ name, options, isReady, id, className, noDataMsg, labelFormat, onChange }) {
  const [selectedState, setSelectedState] = useState([]);
  const howMany = selectedState.length === options.length || selectedState.length === 0 ? 'all' : selectedState.length;
  useEffect(() => setSelectedState(options), [options]);
  
  const [previousSelectionState, setPreviousSelectionState] = useState(deepCopy(options).sort());
  
  const onMenuOpen = () => {
    setPreviousSelectionState(deepCopy(selectedState).sort());
  };
  
  const onMenuClose = () => {
    if (!deepEqual(previousSelectionState, deepCopy(selectedState).sort(), { strict: true })) {
      onChange(selectedState);
    }
  };
  
  const onEvent = (selected, { action }) => {
    setSelectedState(selected);
    if (action === 'clear') {
      onChange(selected);
    }
  };
  
  const placeholder = label => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      content: `"${label}"`,
      display: 'block',
      marginRight: 8,
      color: '#121343'
    }
  })

  const customStyles = label => ({
    indicatorSeparator: styles => ({
      ...styles,
      backgroundColor: 'transparent',
    }),
    option: (styles, state) => ({
      ...styles,
      cursor: 'pointer',
      background: 'transparent',
      color: '#121343'
    }),
    control: styles => ({
      ...styles,
      borderRadius: 0,
      paddingRight: '8px',
      cursor: 'pointer',
    }),
    input: style => ({
      ...style,
      ...placeholder(label)
    }),
    placeholder: style => ({
      ...style,
      ...placeholder(label)
    }),
    menu: styles => ({
      ...styles,
      marginTop: 0,
      borderRadius: 0
    }),
    menuList: styles => ({
      ...styles,
      padding: 0
    })
  })
  
  const DropdownIndicator = props => {
    const {
      getStyles,
      innerProps: { ref, ...restInnerProps },
    } = props;
    const style = {
      ...getStyles('dropdownIndicator', props),
      padding: '8px 8px 8px 0'
    }
    return (
      <div {...restInnerProps} ref={ref} style={style}>
        <svg width="11px" height="7px" viewBox="0 0 11 7">
          <g stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
            <g transform="translate(-496.000000, -121.000000)" fill="currentColor" fillRule="nonzero">
              <g transform="translate(496.000000, 117.000000)">
                <path d="M2.93042135,1.91699438 L9.08300518,8.06957822 C9.36285532,8.34942835 9.36285532,8.80315507 9.08300518,9.08300521 C8.94861639,9.217394 8.76634611,9.29289279 8.57629168,9.29289279 L2.42370786,9.29289279 C2.02794001,9.29289279 1.70710678,8.97205953 1.70710678,8.57629171 L1.70710678,2.42370787 C1.70710678,2.02794002 2.02794001,1.70710678 2.42370786,1.70710678 C2.61376229,1.70710678 2.79603257,1.78260561 2.93042135,1.91699438 Z" transform="translate(5.500000, 5.500000) rotate(-45.000000) translate(-5.500000, -5.500000)"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    )
  }

  const Checkbox = ({ isChecked }) => {
    return (
      <svg width="20px" height="20px" viewBox="0 0 20 20" style={{ marginRight: '8px' }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-23.000000, -41.000000)">
            <g transform="translate(24.000000, 42.000000)">
              <rect stroke="#D6DBE4" strokeWidth="2" x="0" y="0" width="18" height="18" fill="#ffffff"></rect>
              { isChecked && <polygon fill="#24C7CC" points="4.66692304 8.35872968 7.13673213 10.8903181 14.4025708 4 16 5.49137391 7.13673213 14 3 9.96982087"></polygon> }
            </g>
          </g>
        </g>
      </svg>
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
      label,
      children
    } = props
    const style = {
      ...getStyles('menu', props)
    }
    return (
      <div ref={ref} {...restInnerProps} style={style}>
        <div style={{ background: '#E7E7EC', padding: '12px' }}>
          <input />
          <div>
            <Checkbox isChecked /> Uncheck all
          </div>
        </div>
        {children}
      </div>
    )
  }

  return <>
    <AriaLabel id={`${id}Label`} label={`${name} filter`} />
    <Select
      components={{
        DropdownIndicator,
        Option,
        Menu
      }}
      isClearable={false}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      controlShouldRenderValue={false}
      isLoading={!isReady}
      id={id}
      className={className}
      options={options}
      value={selectedState}
      onChange={onEvent}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      placeholder={<div>{howMany}</div>}
      aria-labelledby={`${id}Label`}
      noOptionsMessage={() => <em>{noDataMsg}</em>}
      loadingMessage={() => <em>loading...</em>}
      getOptionLabel={labelFormat}
      getOptionValue={value => value}
      styles={customStyles(name)}
    />
  </>;
}
