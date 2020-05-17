import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import GaugeView from './components/GaugeView';
import { RTLProps } from '../../shared/prop-types/ReducerProps';
import CompView from "./components/CompView";
import TodayView from "./components/TodayView";
import {getRealTimeData, initDashboardData, onGaugeSelect} from "../../redux/actions/dashboardActions";

class Dashboard extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.initDashboardData();
    }

    render() {
        const { t, initialLoad, dashboardLoad, gauges, selectedGaugeIdx, todayStats, getRealTimeData, onGaugeSelect  } = this.props;
        return (
            <Container className="dashboard">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{t('dashboard.page_title')}</h3>
                    </Col>
                </Row>
                <div>
                {
                    initialLoad && dashboardLoad ?
                    <div>
                        <TodayView
                            todayStats={todayStats}
                        />
                        <GaugeView
                            gauges={gauges}
                            selectedGaugeIdx={selectedGaugeIdx}
                            onGaugeSelect={onGaugeSelect}
                            getRealTimeData={getRealTimeData}
                        />
                        <CompView/>
                    </div> : <div class="loader"><p>Loading..</p></div>
                }
                </div>
            </Container>
        )
    }
};

Dashboard.propTypes = {
    t: PropTypes.func.isRequired,
    rtl: RTLProps.isRequired,
};

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    initialLoad: state.dashboard.initialLoad,
    dashboardLoad: state.dashboard.dashboardLoad,
    selectedBranchIdx: state.topbar.selectedBranchIdx,
    branchDetails: state.topbar.branchDetails,
    gauges: state.dashboard.gauges,
    selectedGaugeIdx: state.dashboard.selectedGaugeIdx,
    todayStats: state.dashboard.todayStats
});

const mapDispatchToProps = (dispatch) => ({
    initDashboardData: () => dispatch(initDashboardData()),
    onGaugeSelect: (selected) => dispatch(onGaugeSelect(selected)),
    getRealTimeData: () => dispatch(getRealTimeData()),
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(Dashboard);
