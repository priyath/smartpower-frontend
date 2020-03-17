import React from 'react';
import Select from 'react-select';

const colourOptions = [
    { value: 'ocean', label: 'LOLC Head Office 01', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'LOLC Head Office 02', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'LOLC Head Office 03', color: '#5243AA' },
    { value: 'red', label: 'LOLC Head Office 04', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'LOLC Head Office 05', color: '#FF8B00' },
];

export default () => (
    <Select
        defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        name="colors"
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="select"
    />
);