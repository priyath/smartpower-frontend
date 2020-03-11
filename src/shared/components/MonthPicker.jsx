import React from "react";
import DatePicker from "react-datepicker";

class MonthPicker extends React.Component {
    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
            />
        );
    }
}

export default MonthPicker;