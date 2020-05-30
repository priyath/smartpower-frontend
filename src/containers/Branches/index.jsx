import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import BranchCard from './components/BranchCard';
import BranchFilter from "./components/BranchFilter";
import {getBranchSummary} from "../../redux/actions/branchSummaryActions";
import {compose} from "redux";

class BranchSummary extends PureComponent {

    componentDidMount() {
        this.props.getBranchSummary(this.props.branchDetails);
    }

    render() {
        const {
            t, rtl, branchSummaryDetails, branchSummaryLoaded
        } = this.props;

        console.log('Branch summary details: ', branchSummaryDetails);

        return (
            <Container className="branches">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{t('branches.page_title')}</h3>
                    </Col>
                </Row>
                {
                    branchSummaryLoaded ?
                        <div>
                            <BranchFilter/>
                            <Row>
                                {
                                    branchSummaryDetails.map((branchSummary) => {
                                        return (
                                            <BranchCard
                                                branchSummary={branchSummary}
                                        />)
                                    })
                                }
                            </Row>
                        </div>
                        : <div class="loader"><p>Loading..</p></div>
                }
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
    branchSummaryLoaded: state.branchSummary.branchSummaryLoaded
});

const mapDispatchToProps = (dispatch) => ({
    getBranchSummary: (branchSummary) => dispatch(getBranchSummary(branchSummary))
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(BranchSummary);
