import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ThresholdTable from './components/ThresholdTable';
import {compose} from "redux";
import {connect} from "react-redux";
import WithLoading from "../../App/Router/WrappedRoutes/HOCLoader";

class Alerts extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        const { t } = this.props;
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{t('tables.data_table.title')}</h3>
                        {/*<h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional*/}
                        {/*    information*/}
                        {/*</h3>*/}
                    </Col>
                </Row>
                <Row>
                    <ThresholdTable/>
                </Row>
            </Container>
    )
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(Alerts);
