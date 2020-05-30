import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import IntervalDatePickerField from "../../../shared/components/form/IntervalDatePicker";

const DatePickerView = ({ handleSubmit }) => (
        <IntervalDatePickerField onChange={()=>{}}/>
);

DatePickerView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'sell_btc_form', // a unique identifier for this form
})(DatePickerView);
