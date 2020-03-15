import React from 'react';
import { withTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonToolbar,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown
} from 'reactstrap';
import Panel from './../../../shared/components/Panel';
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import MonthPicker from "../../../shared/components/MonthPicker";
import renderRadioButtonField from '../../../shared/components/form/RadioButton';

const GraphFilter = ({ t, handleSubmit }) => (
  <Panel
    xl={4}
    lg={5}
    md={12}
    xs={12}
    title={t('history.graph_filter')}
  >
    <div className="dashboard__comparison-tab">
      <form className="form form--horizontal" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Scan Type</span>
          <div className="form__form-group-field">
            <UncontrolledDropdown>
              <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
                <p>Select Voltage <ChevronDownIcon /></p>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Voltage 1</DropdownItem>
                <DropdownItem>Voltage 2</DropdownItem>
                <DropdownItem>Voltage 3</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Gauge</span>
          <div className="form__form-group-field">
            <UncontrolledDropdown>
              <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
                <p>Select Gauge <ChevronDownIcon /></p>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Gauge 1</DropdownItem>
                <DropdownItem>Gauge 2</DropdownItem>
                <DropdownItem>Gauge 3</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Date Range</span>
          <div className="form__form-group-field">
            <Field
                name="radio"
                component={renderRadioButtonField}
                label="Preset"
                radioValue="1"
                defaultChecked
            />
            <Field
                name="radio"
                component={renderRadioButtonField}
                label="Custom"
                radioValue="1"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">From</span>
          <div className="form__form-group-field">
            <MonthPicker/>
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">To</span>
          <div className="form__form-group-field">
            <MonthPicker/>
          </div>
        </div>
        <ButtonToolbar className="form__button-toolbar">
          <Button color="primary" type="submit">Apply</Button>
        </ButtonToolbar>
      </form>
    </div>
  </Panel>
);

GraphFilter.propTypes = {
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'defaults_controls', // a unique identifier for this form
})(withTranslation('common')(GraphFilter));