import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LocationInfo from './components/LocationInfo';
import { ThemeProps, RTLProps } from './../../shared/prop-types/ReducerProps';
import GeoMap from "./components/GeoMap";

class History extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        rtl: RTLProps.isRequired,
        theme: ThemeProps.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            branchName: null,
            consumption: null
        };
    }

    onMarkerClick(marker) {
        this.setState({
            branchName: marker.photo_title,
            consumption: marker.consumption
        })
    }

    render() {
        const {
            t, rtl, theme,
        } = this.props;

        return (
            //TODO: classnames should be refactored?
            <Container className="dashboard">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{t('locations.page_title')}</h3>
                    </Col>
                </Row>
                <Row>
                    <GeoMap
                        onMarkerClick={this.onMarkerClick.bind(this)}/>
                    <LocationInfo
                        dir={rtl.direction}
                        theme={theme.className}
                        branchName={this.state.branchName}
                        consumption={this.state.consumption}
                    />
                </Row>
            </Container>
        );
    }
}

export default connect(state => ({
    rtl: state.rtl,
    theme: state.theme,
}))(withTranslation('common')(History));
