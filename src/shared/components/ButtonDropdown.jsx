import React from 'react';
import {
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const ButtonDropdown = ({ t }) => (
    <Col md={12} lg={6} xl={6}>
        <Card>
            <CardBody>
                <div className="card__title">
                    <h5 className="bold-text">{t('ui_elements.buttons.button_dropdown')}</h5>
                </div>
                <h5 className="bold-text">Basic buttons with dropdown</h5>
                <div className="card__title">
                    <h5 className="subhead">Use default dropdown toggle</h5>
                </div>
                <UncontrolledDropdown>
                    <DropdownToggle className="icon icon--right" outline color="primary">
                        <p>Dropdown <ChevronDownIcon /></p>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown__menu">
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </CardBody>
        </Card>
    </Col>
);

ButtonDropdown.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ButtonDropdown);
