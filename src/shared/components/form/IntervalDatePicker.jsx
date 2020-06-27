/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { isMobileOnly } from 'react-device-detect';
import PropTypes from 'prop-types';
import {Button, Col, Row} from "reactstrap";

class IntervalDatePickerField extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date(),
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        //this.handleSubmit();
    }

    handleChangeStart = startDate => this.handleChange({ startDate });

    handleChangeEnd = endDate => this.handleChange({ endDate });

    handleChange({ startDate, endDate }) {
        const { startDate: stateStartDate, endDate: stateEndDate } = this.state;

        startDate = startDate || stateStartDate;
        endDate = endDate || stateEndDate;

        this.setState({ startDate, endDate });
    }

    handleSubmit = () => {
        const fromDate = this.state.startDate;
        const toDate = this.state.endDate;
        this.props.onSubmit({fromDate, toDate});
    };

    render() {
        const { startDate, endDate } = this.state;

        return (
            <Row>
                <Col md={3} class="text-center" align="right">
                    <DatePicker
                        className='input-component'
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        onChange={this.handleChangeStart}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="From"
                        dropDownMode="select"
                        withPortal={isMobileOnly}
                    />
                </Col>
                <Col md={3} class="text-center" align="center">
                    <DatePicker
                        className='input-component'
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        onChange={this.handleChangeEnd}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="To"
                        dropDownMode="select"
                        withPortal={isMobileOnly}
                    />
                </Col>
                <Col md={4} class="text-center" align="right">
                    <Button onClick={this.handleSubmit} color="primary" size="sm">Apply</Button>
                </Col>
            </Row>
        );
    }
}

const renderIntervalDatePickerField = (props) => {
    const { input } = props;
    return (
        <IntervalDatePickerField
            {...input}
        />
    );
};

renderIntervalDatePickerField.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func,
    }).isRequired,
};

export default IntervalDatePickerField;
