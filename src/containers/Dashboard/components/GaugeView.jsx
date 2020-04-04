import React from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./gauge/GaugeGrid";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {connect} from "react-redux";
import {onGaugeSelect} from "../../../redux/actions/dashboardActions";

const GaugeView = ({ t, gauges, onGaugeSelect }) => {
    return (
        <Panel md={12} lg={12} xl={5} sm={12} xs={12}  title={t('dashboard.main_gauges')}>
                <GaugeGrid gauges={gauges} onGaugeSelect={onGaugeSelect}/>
        </Panel>
    );
};

export default compose(withTranslation('common'), connect((state) => ({
    rtl: state.rtl,
    gauges: state.dashboard.gauges
}), dispatch => {
    return {
        onGaugeSelect: (selected) => dispatch(onGaugeSelect(selected)),
    }}))(GaugeView);