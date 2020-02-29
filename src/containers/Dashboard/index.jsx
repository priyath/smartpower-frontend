import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Visits from './components/Visits';
import TotalPageViews from './components/TotalPageViews';
import NewUsers from './components/NewUsers';
import BounceRate from './components/BounceRate';
import ABTestingAnalytics from './components/ABTestingAnalytics';
import SalesStatistic from './components/SalesStatistic';
import VisitorsSessions from './components/VisitorsSessions';
import BounceRateArea from './components/BounceRateArea';
import AudienceByCountry from './components/AudienceByCountry';
import BudgetStatistic from './components/BudgetStatistic';
import { RTLProps } from '../../shared/prop-types/ReducerProps';

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
            <ABTestingAnalytics dir={rtl.direction} />
            <BounceRateArea dir={rtl.direction} />
            <VisitorsSessions dir={rtl.direction} />
            <SalesStatistic />
            <BudgetStatistic />
            <AudienceByCountry />
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
