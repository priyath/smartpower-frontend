import React from 'react';
import {Card, CardBody, Col, Progress} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const TodayStats = ({ t }) => (
    <Col md={12} xl={6} lg={6} xs={12}>
        <Card>
            <CardBody className="dashboard__card-widget">
                <div className="card__title">
                    <h5 className="bold-text">{t('dashboard.today_status')}</h5>
                </div>
        <div className="dashboard__sales-report">
            <div className="progress-wrap progress-wrap--small">
                <p className="dashboard__sales-report-title">Peak kW</p>
                <p className="dashboard__sales-report-now">250kWh</p>
            </div>
            <div className="progress-wrap progress-wrap--small progress-wrap--pink">
                <p className="dashboard__sales-report-title">Low Voltage</p>
                <p className="dashboard__sales-report-now">120.5 V</p>
            </div>
            <div className="progress-wrap progress-wrap--small progress-wrap--pink">
                <p className="dashboard__sales-report-title">High Voltage</p>
                <p className="dashboard__sales-report-now">240 V</p>
            </div>
        </div>
            </CardBody>
        </Card>
    </Col>
);

TodayStats.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(TodayStats);
