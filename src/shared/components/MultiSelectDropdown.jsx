import React from 'react';
import Select from 'react-select';

const colourOptions = [
    { value: 'ocean', label: 'LOLC Head Office 01', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Techno Office', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Techno Office -RG', color: '#5243AA' },
];

export default () => (
    <Select
        defaultValue={[colourOptions[0], colourOptions[1], colourOptions[2]]}
        isMulti
        name="colors"
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="select"
    />
);
