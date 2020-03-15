import React, { PureComponent } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import MultiSelectDropdown from "../../../shared/components/MultiSelectDropdown";
import DatePickerView from "./DatePickerView";


export default class BranchFilter extends PureComponent {
    static propTypes = {
        dir: PropTypes.string.isRequired,
    };

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className="branches__controls">
                <Row>
                    <Col md={3}>
                        <MultiSelectDropdown/>
                    </Col>
                    <Col md={6} class="text-center">
                        <DatePickerView/>
                    </Col>
                </Row>
            </div>
        );
    }
}
