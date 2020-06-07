import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import BranchCard from './components/BranchCard';
import BranchFilter from "./components/BranchFilter";
import {getBranchSummary} from "../../redux/actions/branchSummaryActions";
import {getDateBasedOnGranularity} from "../../logic/commonLogic";
import {compose} from "redux";

class BranchSummary extends PureComponent {

    componentDidMount() {
    }

    fetchSummaryDetails = (payload) => {
        const fromDate = getDateBasedOnGranularity(payload.fromDate, 'hour');
        const toDate = getDateBasedOnGranularity(payload.toDate, 'hour');

        this.props.getBranchSummary(this.props.branchDetails, {fromDate, toDate});
    }

    render() {
        const {
            t, rtl, branchSummaryDetails, fetchingBranchSummary, branchSummaryLoaded
        } = this.props;

        return (
            <Container className="branches">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{t('branches.page_title')}</h3>
                    </Col>
                </Row>
                        <div>
                            <BranchFilter fetchSummaryDetails={this.fetchSummaryDetails}/>
                            <Row>
                                {
                                    branchSummaryLoaded && !fetchingBranchSummary ?
                                    branchSummaryDetails.map((branchSummary) => {
                                        return (
                                            <BranchCard
                                                branchSummary={branchSummary}
                                        />)
                                    }) : fetchingBranchSummary ? <div className='loader'><p className='branch__summary-loading'>Retrieving branch summary data</p></div> :
                                        <p className='branch__summary-loading'>Select a date range to view branch summary</p>
                                }
                            </Row>
                        </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    theme: state.theme,
    initialLoad: state.topbar.initialLoad,
    selectedBranchIdx: state.topbar.selectedBranchIdx,
    branchDetails: state.topbar.branchDetails,
    branchSummaryDetails: state.branchSummary.branchSummaryDetails,
    branchSummaryLoaded: state.branchSummary.branchSummaryLoaded,
    fetchingBranchSummary: state.branchSummary.fetchingBranchSummary
});

const mapDispatchToProps = (dispatch) => ({
    getBranchSummary: (branchSummary, filterOptions) => dispatch(getBranchSummary(branchSummary, filterOptions))
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(BranchSummary);
