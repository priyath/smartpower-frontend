import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import AlertTable from './components/AlertTable';

const Alerts = ({ t }) => (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="page-title">{t('tables.data_table.title')}</h3>
                <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                    information
                </h3>
            </Col>
        </Row>
        <Row>
            <AlertTable />
        </Row>
    </Container>
);

Alerts.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Alerts);
