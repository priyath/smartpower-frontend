import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Visits from './components/Visits';
import TotalPageViews from './components/TotalPageViews';
import NewUsers from './components/NewUsers';
import GaugeView from './components/GaugeView';
import { RTLProps } from '../../shared/prop-types/ReducerProps';
import HeartBeat from "./components/HeartBeat";
import CompView from "./components/CompView";
import CompControl from "./components/CompControl";

const Dashboard = ({ t, rtl }) => (
    <Container className="dashboard">
        <Row>
            <Col md={12}>
                <h3 className="page-title">{t('dashboard.page_title')}</h3>
            </Col>
        </Row>
        <Row>
            <Visits />
            <TotalPageViews />
            <NewUsers />
        </Row>
        <Row>
            <GaugeView/>
            <HeartBeat/>
        </Row>
        <Row>
            <CompControl/>
            <CompView/>
        </Row>
    </Container>
);

Dashboard.propTypes = {
    t: PropTypes.func.isRequired,
    rtl: RTLProps.isRequired,
};

export default compose(withTranslation('common'), connect(state => ({
    rtl: state.rtl,
})))(Dashboard);
