import React, { PureComponent } from 'react';
import {
    Button, Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import MenuDownIcon from 'mdi-react/MenuDownIcon';
import MonthPicker from "../../../../shared/components/MonthPicker";
import { getYearMonth } from "../../../../logic/dashboard";

class CompControl extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            activeTab: '1',
            granularity: 'month',
            compareOne: new Date(),
            compareTwo: new Date(),
            type: 'kwh',
        };
    }

    toggle = (tab) => {
        const { activeTab } = this.state;
        if (activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    onChangeGranularity = (e, id) => {
        this.setState({granularity: id});
    }

    onChangeFromDate = (date) => {
        this.setState({
            compareOne: date
        })
    }

    onChangeToDate = (date) => {
        this.setState({
            compareTwo: date
        })
    }

    onSubmitFilters = () => {
        const fromDate = getYearMonth(this.state.compareOne);
        const toDate = getYearMonth(this.state.compareTwo);
        const comparisonFilters = {
            fromDate: fromDate,
            toDate: toDate,
            granularity: this.state.granularity,
        };
        this.props.getComparisonData(comparisonFilters);
    }


    render() {
        const { t } = this.props;
        const { activeTab, granularity, compareOne, compareTwo } = this.state;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="card__title">
                            <h5 className="bold-text">{t('dashboard.today_status')}</h5>
                        </div>
                        <div className="dashboard__sales-report">
                            <div className="progress-wrap progress-wrap--small">
                                <UncontrolledDropdown>
                                    <DropdownToggle className="icon icon--right" outline size="sm">
                                        <p>{granularity}<MenuDownIcon /></p>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown__menu">
                                        <DropdownItem onClick={(e) => this.onChangeGranularity(e, 'month')}>Month</DropdownItem>
                                        <DropdownItem onClick={(e) => this.onChangeGranularity(e, 'week')}>Week</DropdownItem>
                                        <DropdownItem onClick={(e) => this.onChangeGranularity(e, 'day')}>Day</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <div className="progress-wrap progress-wrap--small progress-wrap--pink">
                                <span className="form__form-group-label">From </span>
                                <MonthPicker onChangeDate={this.onChangeFromDate} startDate={compareOne}/>
                            </div>
                            <div className="progress-wrap progress-wrap--small progress-wrap--pink">
                                <span className="form__form-group-label">From </span>
                                <MonthPicker onChangeDate={this.onChangeToDate} startDate={compareTwo}/>
                            </div>
                            <div className="progress-wrap progress-wrap--small progress-wrap--pink">
                                <Button onClick={this.onSubmitFilters} color="primary" size="sm">Apply</Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default withTranslation('common')(CompControl);
