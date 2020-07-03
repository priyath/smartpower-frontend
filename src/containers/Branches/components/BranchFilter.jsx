import React, { PureComponent } from 'react';
import {
    Button,
    ButtonToolbar, Card, CardBody,
    Row,
} from 'reactstrap';
import MultiSelectDropdown from "../../../shared/components/MultiSelectDropdown";
import DatePicker from "react-datepicker";
import {isMobileOnly} from "react-device-detect";

export default class BranchFilter extends PureComponent {

    constructor() {
        super();
        this.state = {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date(),
        };
        this.handleChange = this.handleChange.bind(this);
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
        this.props.fetchSummaryDetails({fromDate, toDate});
    };

    render() {
        const { startDate, endDate } = this.state;
        return (
            <div className="branches__controls">
                <Row>
                    <Card>
                        <CardBody className="dashboard__card-widget">
                            <div className="dashboard__comp-control">
                                <ButtonToolbar>

                                    <MultiSelectDropdown branchDetails={this.props.branchDetails}/>

                                    <div className='dashboard__comp-control-date-picker'>
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
                                    </div>
                                    <div className='dashboard__comp-control-date-picker'>
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
                                    </div>
                                    <div className="control-panel dashboard__comp-control--apply">
                                    <Button onClick={this.handleSubmit} color="primary" size="sm">Apply</Button>
                                    </div>
                                </ButtonToolbar>
                    {/*<ButtonToolbar>*/}
                    {/*    <UncontrolledDropdown className={'dashboard__comp-control-dropdown'}>*/}
                    {/*        <DropdownToggle className="icon icon--right" outline size="sm">*/}
                    {/*            <p>Granularity<MenuDownIcon /></p>*/}
                    {/*        </DropdownToggle>*/}
                    {/*        <DropdownMenu className="dropdown__menu">*/}
                    {/*            <DropdownItem onClick={(e) => this.onChangeGranularity(e, 'month')}>Month</DropdownItem>*/}
                    {/*            <DropdownItem onClick={(e) => this.onChangeGranularity(e, 'week')}>Week</DropdownItem>*/}
                    {/*            <DropdownItem onClick={(e) => this.onChangeGranularity(e, 'day')}>Day</DropdownItem>*/}
                    {/*        </DropdownMenu>*/}
                    {/*    </UncontrolledDropdown>*/}

                    {/*    <div className='dashboard__comp-control-date-picker'>*/}
                    {/*        <MonthPicker onChangeDate={this.onChangeFromDate} startDate={startDate}/>*/}
                    {/*    </div>*/}

                    {/*    <div className='dashboard__comp-control-date-picker'>*/}
                    {/*        <MonthPicker onChangeDate={this.onChangeToDate} startDate={startDate}/>*/}
                    {/*    </div>*/}

                    {/*    <div className="control-panel dashboard__comp-control--apply">*/}
                    {/*        <Button onClick={this.onSubmitFilters} color="primary" size="sm">Apply</Button>*/}
                    {/*    </div>*/}
                    {/*</ButtonToolbar>*/}
                    </div>
                        </CardBody>
                    </Card>
                </Row>
            </div>
        );
    }
}
