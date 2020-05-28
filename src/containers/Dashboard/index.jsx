import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import RealtimeView from './components/RealtimeView';
import { RTLProps } from '../../shared/prop-types/ReducerProps';
import CompView from "./components/CompView";
import TodayView from "./components/TodayView";
import {initDashboardData, getComparisonData} from "../../redux/actions/dashboardActions";

class Dashboard extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.initDashboardData();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //handle branch change
        if (!nextProps.dashboardLoad){
            this.props.initDashboardData();
        }
    }

    render() {
        const { t, initialLoad, compKeys, dashboardLoad,
            todayStats, getComparisonData  } = this.props;
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
                        <RealtimeView/>
                        <CompView
                            getComparisonData={getComparisonData}
                            compKeys={compKeys}
                        />
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
    todayStats: state.dashboard.todayStats,
    compKeys: state.dashboard.compKeys,
});

const mapDispatchToProps = (dispatch) => ({
    initDashboardData: () => dispatch(initDashboardData()),
    getComparisonData: (comparisonFilters) => dispatch(getComparisonData(comparisonFilters)),
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(Dashboard);
