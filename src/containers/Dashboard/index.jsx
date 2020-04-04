import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import GaugeView from './components/GaugeView';
import { RTLProps } from '../../shared/prop-types/ReducerProps';
import CompView from "./components/CompView";
import TodayView from "./components/TodayView";

const Dashboard = ({ t, rtl }) => {
    return (
        <Container className="dashboard">
            <Row>
                <Col md={12}>
                    <h3 className="page-title">{t('dashboard.page_title')}</h3>
                </Col>
            </Row>
            <TodayView/>
            <GaugeView/>
            <CompView/>
        </Container>
    )
};

Dashboard.propTypes = {
    t: PropTypes.func.isRequired,
    rtl: RTLProps.isRequired,
};

export default compose(withTranslation('common'), connect((state) => ({
    rtl: state.rtl
}), dispatch => {
    return {
    }}))(Dashboard);