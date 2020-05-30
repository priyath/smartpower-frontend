import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TestGraph from './components/TestGraph';
import { ThemeProps, RTLProps } from '../../shared/prop-types/ReducerProps';
import WithLoading from "../App/Router/WrappedRoutes/HOCLoader";
import {loadHistoryData} from "../../redux/actions/historyActions";
import {compose} from "redux";

class History extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        rtl: RTLProps.isRequired,
        theme: ThemeProps.isRequired,
    };

    componentDidMount() {
        if (!this.props.historyLoaded)
            this.props.loadHistoryData();
    }

    render() {
        const { t, historyData, historyLoaded, selectedBranchName } = this.props;
        const HistoryWithLoading = WithLoading(TestGraph);

        return (
            <Container className="history">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{selectedBranchName}</h3>
                    </Col>
                </Row>
                <Row>
                    <HistoryWithLoading historyData={historyData} isLoading={!historyLoaded}/>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    historyLoaded: state.history.historyLoaded,
    historyData: state.history.historyData,
    theme: state.theme,
    selectedBranchName: state.topbar.selectedBranchName,
});

const mapDispatchToProps = (dispatch) => ({
    loadHistoryData: () => dispatch(loadHistoryData())
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(History);
