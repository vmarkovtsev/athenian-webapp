import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import deepEqual from 'deep-equal';

import AriaLabel from 'js/components/ui/AriaLabel';

// It is not needed a more formal definition because the options passed to MultiSelect
// in our case are arrays of primitives, or arrays of simple objects [{foo <primitive|array>,...}, ...]
const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default ({ name, options, isReady, id, className, noDataMsg, labelFormat, onChange }) => {
    const [selectedState, setSelectedState] = useState([]);
    const howMany = selectedState.length === options.length || selectedState.length === 0 ? 'all' : selectedState.length;
    useEffect(() => setSelectedState([]), [options]);

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

    const customStyles = {
        option: (styles, state) => ({
          ...styles,
          cursor: 'pointer',
        }),
        control: (styles) => ({
          ...styles,
          cursor: 'pointer',
        })
    }

    return <>
        <AriaLabel id={`${id}Label`} label={`${name} filter`} />
        <Select
            isMulti
            isSearchable
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
            placeholder={`${name} (${howMany})`}
            aria-labelledby={`${id}Label`}
            noOptionsMessage={() => <em>{noDataMsg}</em>}
            loadingMessage={() => <em>loading...</em>}
            getOptionLabel={labelFormat}
            getOptionValue={value => value}
            styles={customStyles}
        />
    </>;
}
