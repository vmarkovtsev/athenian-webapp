import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import AriaLabel from 'js/components/ui/AriaLabel';

export default ({ name, options, isReady, id, className, noDataMsg, labelFormat }) => {
    const [selectedState, setSelectedState] = useState(options);
    const howMany = selectedState.length === options.length ? 'all' : selectedState.length;
    useEffect(() => setSelectedState(options), [options]);
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
            onChange={setSelectedState}
            placeholder={`${name} (${howMany})`}
            aria-labelledby={`${id}Label`}
            noOptionsMessage={() => <em>{noDataMsg}</em>}
            loadingMessage={() => <em>loading...</em>}
            getOptionLabel={labelFormat}
            getOptionValue={value => value}
        />
    </>;
}
