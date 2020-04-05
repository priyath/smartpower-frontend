import React, {Component} from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./gauge/GaugeGrid";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {connect} from "react-redux";
import { onGaugeSelect, getRealTimeData } from "../../../redux/actions/dashboardActions";
import { Row } from 'reactstrap';
import HighChart from "./HighChart";

class GaugeView extends Component {
    timer;
    constructor() {
        super();
        this.setRef = this.setRef.bind(this);
    }

    setRef(input) {
        this.childRef = input;
    }

    updateChartRef(selectedGaugeObject){
        const realtimeData = selectedGaugeObject.realtimeData;
        let chart = this.childRef.chart;
        chart.series[0].addPoint([realtimeData[realtimeData.length - 3]], false, true);
        chart.series[0].addPoint([realtimeData[realtimeData.length - 2]], false, true);
        chart.series[0].addPoint([realtimeData[realtimeData.length - 1]], true, true);
    }

    componentDidMount() {
        this.timer = setInterval(() =>  this.props.getRealTimeData(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        const { gauges, heartbeat, selectedGaugeIdx, t, onGaugeSelect } = this.props;

        if (this.childRef) {
            this.updateChartRef(gauges[selectedGaugeIdx]);
        }

        return (
            <Row>
                <Panel md={12} lg={12} xl={5} sm={12} xs={12}  title={t('dashboard.main_gauges')}>
                    <GaugeGrid gauges={gauges} onGaugeSelect={onGaugeSelect}/>
                </Panel>
                <HighChart setRef={this.setRef} initialData={gauges[selectedGaugeIdx].realtimeData}/>
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
