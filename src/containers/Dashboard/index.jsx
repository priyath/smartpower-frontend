import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import KWValue from './components/KWValue';
import Cost from './components/Cost';
import GaugeView from './components/GaugeView';
import { RTLProps } from '../../shared/prop-types/ReducerProps';
import HeartBeat from "./components/HeartBeat";
import CompView from "./components/CompView";
import CompControl from "./components/CompControl";
import TodayStats from "./components/TodayStats";

const Dashboard = ({ t, rtl, dashboard }) => {
    const { todayStats, consumption, cost, heartbeat } = dashboard;
    return (
        <Container className="dashboard">
            <Row>
                <Col md={12}>
                    <h3 className="page-title">{t('dashboard.page_title')}</h3>
                </Col>
            </Row>
            <Row>
                <TodayStats todayStats={todayStats} />
                <KWValue consumption={consumption} />
                <Cost cost={cost}/>
            </Row>
            <Row>
                <GaugeView/>
                <HeartBeat heartbeat={heartbeat}/>
            </Row>
            <Row>
                <CompControl/>
                <CompView/>
            </Row>
        </Container>
    )
};

Dashboard.propTypes = {
    t: PropTypes.func.isRequired,
    rtl: RTLProps.isRequired,
};

export default compose(withTranslation('common'), connect(state => ({
    rtl: state.rtl,
    dashboard: state.dashboard
})))(Dashboard);
