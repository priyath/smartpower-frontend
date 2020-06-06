import React, { PureComponent } from 'react';
import { Col, Row } from 'reactstrap';
import MultiSelectDropdown from "../../../shared/components/MultiSelectDropdown";
import DatePickerView from "./DatePickerView";


export default class BranchFilter extends PureComponent {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className="branches__controls">
                <Row>
                    <Col md={4}>
                        <MultiSelectDropdown/>
                    </Col>
                    <Col md={8}>
                    <DatePickerView fetchSummaryDetails={this.props.fetchSummaryDetails}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
