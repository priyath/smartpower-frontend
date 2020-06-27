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
        console.log(this.props.branchDetails)
        return (
            <div className="branches__controls">
                <Row>
                    <Col md={4}>
                        <MultiSelectDropdown branchDetails={this.props.branchDetails}/>
                    </Col>
                    <Col md={8}>
                    <DatePickerView fetchSummaryDetails={this.props.fetchSummaryDetails}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
