import React, {Component} from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./gauge/GaugeGrid";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {connect} from "react-redux";
import { onGaugeSelect, getRealTimeData } from "../../../redux/actions/dashboardActions";
import { Row } from 'reactstrap';
import LiveChart from "./LiveChart";

class GaugeView extends Component {
    constructor() {
        super();
    }

    render() {
        const { gauges, selectedGaugeIdx, t, onGaugeSelect } = this.props;

        return (
            <Row>
                <Panel md={12} lg={12} xl={5} sm={12} xs={12}  title={t('dashboard.main_gauges')}>
                    <GaugeGrid gauges={gauges} onGaugeSelect={onGaugeSelect}/>
                </Panel>
                <LiveChart
                    data={gauges[selectedGaugeIdx].realtimeData}
                    getRealTimeData={this.props.getRealTimeData}
                    selectedGaugeIdx={selectedGaugeIdx}
                />
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    gauges: state.dashboard.gauges,
    heartbeat: state.dashboard.heartbeat,
    selectedGaugeIdx: state.dashboard.selectedGaugeIdx,
});

const mapDispatchToProps = (dispatch) => ({
    onGaugeSelect: (selected) => dispatch(onGaugeSelect(selected)),
    getRealTimeData: (selected) => dispatch(getRealTimeData()),
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(GaugeView);
