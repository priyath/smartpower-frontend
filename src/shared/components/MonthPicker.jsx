import React from "react";
import DatePicker from "react-datepicker";

class MonthPicker extends React.Component {

    handleChange = date => {
        this.props.onChangeDate(date);
    };

    render() {
        return (
            <DatePicker
                className='input-component'
                selected={this.props.startDate}
                onChange={this.handleChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
            />
        );
    }
}

export default MonthPicker;
