import React, {PureComponent} from 'react';
import Select from 'react-select';

const getSelections = (list) => {
    if (!list) return [];
    return list.map((branch, idx) => {
        return {
            value: branch.location,
            label: branch.location,
        }
    })
}

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: '#232329' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        //const color = chroma(data.color);
        return {
            ...styles,
            // backgroundColor: isDisabled ? 'red' : 'blue',
            // color: '#FFF',
            // cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
};

export default class MultiSelectDropdown extends PureComponent {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const {branchDetails} = this.props;
        return (
            <Select
                defaultValue={getSelections(branchDetails)}
                isMulti
                name="branch-summary"
                options={getSelections(branchDetails)}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
            />
        );
    }
}
