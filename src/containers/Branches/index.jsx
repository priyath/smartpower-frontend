import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BranchCard from './components/BranchCard';
import { ThemeProps, RTLProps } from './../../shared/prop-types/ReducerProps';
import BranchFilter from "./components/BranchFilter";

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

export default connect(state => ({
    rtl: state.rtl,
    theme: state.theme,
}))(withTranslation('common')(BranchSummary));
