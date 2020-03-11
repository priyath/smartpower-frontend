import React from 'react';
import {
  Button,
  ButtonToolbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

const CompControlForm = ({ handleSubmit }) => (
  <div className="dashboard__comparison-tab">
 <form className="form form--horizontal" onSubmit={handleSubmit}>
      <div className="form__form-group">
        <span className="form__form-group-label">Granularity</span>
        <div className="form__form-group-field">
          <UncontrolledDropdown>
            <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
              <p>Dropdown <ChevronDownIcon /></p>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Year</span>
        <div className="form__form-group-field">
          <UncontrolledDropdown>
            <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
              <p>Dropdown <ChevronDownIcon /></p>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Month</span>
        <div className="form__form-group-field">
          <UncontrolledDropdown>
            <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
              <p>Dropdown <ChevronDownIcon /></p>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Compare With</span>
        <div className="form__form-group-field">
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Year</span>
        <div className="form__form-group-field">
          <UncontrolledDropdown>
            <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
              <p>Dropdown <ChevronDownIcon /></p>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Month</span>
        <div className="form__form-group-field">
          <UncontrolledDropdown>
            <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
              <p>Dropdown <ChevronDownIcon /></p>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <ButtonToolbar className="form__button-toolbar">
        <Button color="primary" type="submit">Apply</Button>
      </ButtonToolbar>
    </form>
  </div>
);

CompControlForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'buy_btc_form', // a unique identifier for this form
})(CompControlForm);
