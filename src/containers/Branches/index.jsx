import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BranchCard from './components/BranchCard';
import { ThemeProps, RTLProps } from './../../shared/prop-types/ReducerProps';
import BranchFilter from "./components/BranchFilter";
import {getComparisonData, initDashboardData} from "../../redux/actions/dashboardActions";
import {compose} from "redux";

class BranchSummary extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        rtl: RTLProps.isRequired,
        theme: ThemeProps.isRequired,
    };

    render() {
        const {
            t, rtl,
        } = this.props;

        return (
            <Container className="branches">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{t('branches.page_title')}</h3>
                    </Col>
                </Row>
                    <BranchFilter/>
                <Row>
                    <BranchCard dir={rtl.direction} />
                    <BranchCard dir={rtl.direction} />
                    <BranchCard dir={rtl.direction} />
                    <BranchCard dir={rtl.direction} />
                    <BranchCard dir={rtl.direction} />
                    <BranchCard dir={rtl.direction} />
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    theme: state.theme,
    initialLoad: state.topbar.initialLoad,
    dashboardLoad: state.dashboard.dashboardLoad,
    selectedBranchIdx: state.topbar.selectedBranchIdx,
    branchDetails: state.topbar.branchDetails,
    todayStats: state.dashboard.todayStats,
    compKeys: state.dashboard.compKeys,
});

const mapDispatchToProps = (dispatch) => ({
    initDashboardData: () => dispatch(initDashboardData()),
    getComparisonData: (comparisonFilters) => dispatch(getComparisonData(comparisonFilters)),
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(BranchSummary);
