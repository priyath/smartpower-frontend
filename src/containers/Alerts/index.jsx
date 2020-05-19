import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import AlertTable from './components/AlertTable';
import {fetchAlerts} from "../../redux/actions/alertActions";
import {compose} from "redux";
import {connect} from "react-redux";
import WithLoading from "../App/Router/WrappedRoutes/HOCLoader";

class Alerts extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchAlerts();
    }

    render() {
        const { t, alertList, alertsLoaded } = this.props;
        const AlertWithLoading = WithLoading(AlertTable);
        return (
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
                    <AlertWithLoading isLoading={!(alertsLoaded)}/>
                </Row>
            </Container>
    )
    }
}
Alerts.propTypes = {
    t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    alertList: state.alert.persistedAlertList,
    alertsLoaded: state.alert.alertsLoaded
});

const mapDispatchToProps = (dispatch) => ({
    fetchAlerts: () => dispatch(fetchAlerts())
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(Alerts);
