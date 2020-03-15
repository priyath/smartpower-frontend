import React from 'react';
import {Button, ButtonToolbar, Col} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker/es";
import IntervalDatePickerField from "../../../shared/components/form/IntervalDatePicker";

const DatePickerView = ({ handleSubmit }) => (
    <div class="branches_interval-date-picker">
        <IntervalDatePickerField onChange={()=>{}}/>
    </div>
);

DatePickerView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'sell_btc_form', // a unique identifier for this form
})(DatePickerView);
