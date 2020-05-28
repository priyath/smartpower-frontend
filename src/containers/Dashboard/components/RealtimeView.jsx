import React, {Component} from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./realtime/GaugeGrid";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {connect} from "react-redux";
import { Row } from 'reactstrap';
import LiveChart from "./realtime/LiveChart";
import {getRealTimeData, onGaugeSelect} from "../../../redux/actions/dashboardActions";

class RealtimeView extends Component {
    constructor() {
        super();
    }

    render() {
        const { gauges, thresholds, selectedGaugeIdx, t, onGaugeSelect, getRealTimeData } = this.props;
        return (
            <Row>
                <Panel md={12} lg={12} xl={5} sm={12} xs={12}  title={t('dashboard.main_gauges')}>
                    <GaugeGrid gauges={gauges} onGaugeSelect={onGaugeSelect}/>
                </Panel>
                <LiveChart
                    data={gauges[selectedGaugeIdx]}
                    getRealTimeData={getRealTimeData}
                    selectedGaugeIdx={selectedGaugeIdx} // TODO: read this from the selected gauge itself
                    thresholds={thresholds}
                />
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    selectedGaugeIdx: state.dashboard.selectedGaugeIdx,
    gauges: state.dashboard.gauges,
    thresholds: state.dashboard.thresholds,
});

const mapDispatchToProps = (dispatch) => ({
    onGaugeSelect: (selected) => dispatch(onGaugeSelect(selected)),
    getRealTimeData: () => dispatch(getRealTimeData()),
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(RealtimeView);
