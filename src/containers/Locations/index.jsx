import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LocationInfo from './components/LocationInfo';
import { ThemeProps, RTLProps } from '../../shared/prop-types/ReducerProps';
import GeoMap from "./components/GeoMap";
import {compose} from "redux";
import {fetchAlerts} from "../../redux/actions/alertActions";
import {updateBranchDetailsWithAlertCount} from '../../logic/alertManager';
import {fetchAlertSummaryFromDatabase} from '../../repositories/alertRepository';

class Locations extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        rtl: RTLProps.isRequired,
        theme: ThemeProps.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            branchName: "Select a Branch",
            consumption: null,
            alertSummaryLoaded: false,
            alertSummaryDetails: [],
        };
    }

    componentDidMount() {
        fetchAlertSummaryFromDatabase().then((resp) => {
            this.setState({alertSummaryDetails: resp.data, alertSummaryLoaded: true})
        })
    }

    onMarkerClick(marker) {
        this.setState({
            branchName: marker.location,
            consumption: ''
        })
    }

    render() {
        const {
            t, rtl, theme, initialLoad, alertSummaryLoad
        } = this.props;

        const {alertSummaryLoaded, alertSummaryDetails} = this.state;
        const branchDetails = updateBranchDetailsWithAlertCount(this.props.branchDetails, alertSummaryDetails);

        return (
            //TODO: classnames should be refactored?
            <Container className="dashboard">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{t('locations.page_title')}</h3>
                    </Col>
                </Row>

                    {
                        initialLoad && alertSummaryLoaded ?
                            <Row>
                            <GeoMap
                                onMarkerClick={this.onMarkerClick.bind(this)} branchList={branchDetails}/>
                            <LocationInfo
                                dir={rtl.direction}
                                theme={theme.className}
                                branchName={this.state.branchName}
                                consumption={this.state.consumption}
                                branchDetails={branchDetails}
                            />
                            </Row> : <Row className="loader"><p>Loading..</p></Row>
                    }
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    theme: state.theme,
    initialLoad: state.topbar.initialLoad,
    branchDetails: state.topbar.branchDetails,
    alertList: state.alert.persistedAlertList,
    alertsLoaded: state.alert.alertsLoaded
});

const mapDispatchToProps = (dispatch) => ({
    fetchAlertSummary: () => dispatch(fetchAlerts())
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(Locations);

