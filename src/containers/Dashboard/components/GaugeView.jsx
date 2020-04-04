import React from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./gauge/GaugeGrid";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {connect} from "react-redux";
import {onGaugeSelect} from "../../../redux/actions/dashboardActions";
import HeartBeat from "./HeartBeat";
import { Row } from 'reactstrap';

const GaugeView = ({ t, gauges, heartbeat, onGaugeSelect }) => {
    return (
        <Row>
            <Panel md={12} lg={12} xl={5} sm={12} xs={12}  title={t('dashboard.main_gauges')}>
                <GaugeGrid gauges={gauges} onGaugeSelect={onGaugeSelect}/>
            </Panel>
            <HeartBeat heartbeat={heartbeat}/>
        </Row>
    );
};

export default compose(withTranslation('common'), connect((state) => ({
    rtl: state.rtl,
    gauges: state.dashboard.gauges,
    heartbeat: state.dashboard.heartbeat
}), dispatch => {
    return {
        onGaugeSelect: (selected) => dispatch(onGaugeSelect(selected)),
    }}))(GaugeView);