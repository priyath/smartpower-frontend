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
import { loadTodayStats } from "../../redux/actions/dashboardActions";

class Dashboard extends Component {
    constructor() {
        super();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.initialLoad && !nextProps.dashboardLoad){
            this.props.loadTodayStats();
            return false;
        }
        return true;
    }

    render() {
        const { t, initialLoad } = this.props;
        return (
            <Container className="dashboard">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{t('dashboard.page_title')}</h3>
                    </Col>
                </Row>
                <div>
                {
                    initialLoad ?
                    <div>
                        <TodayView/>
                        <GaugeView/>
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
});

const mapDispatchToProps = (dispatch) => ({
    loadTodayStats: () => dispatch(loadTodayStats()),
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(Dashboard);
