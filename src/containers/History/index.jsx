import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodayStatus from './components/TodayStatus';
import LiveVoltageGraph from './components/LiveVoltageGraph';
import GraphFilter from './components/GraphFilter';
import HistoryGraph from './components/HistoryGraph';
import { ThemeProps, RTLProps } from './../../shared/prop-types/ReducerProps';

const branchName = "Biyagama Branch";

class History extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        rtl: RTLProps.isRequired,
        theme: ThemeProps.isRequired,
    };

    render() {
        const {
            t, rtl, theme,
        } = this.props;

        return (
            <Container className="history">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{branchName}</h3>
                    </Col>
                </Row>
                <Row>
                    <GraphFilter/>
                    <HistoryGraph
                        dir={rtl.direction}
                        theme={theme.className}
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
