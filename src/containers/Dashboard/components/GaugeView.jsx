import React, {Component} from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./gauge/GaugeGrid";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {connect} from "react-redux";
import { onGaugeSelect, getRealTimeData } from "../../../redux/actions/dashboardActions";
import HeartBeat from "./HeartBeat";
import { Row } from 'reactstrap';

class GaugeView extends Component {
    timer;
    constructor() {
        super();
    }

    componentDidMount() {
        this.timer = setInterval(()=>  this.props.getRealTimeData(), 5000);
    }

    componentWillUnmount() {
        console.log('unmounted');
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        const { gauges, heartbeat, t, onGaugeSelect } = this.props;
        return (
            <Row>
                <Panel md={12} lg={12} xl={5} sm={12} xs={12}  title={t('dashboard.main_gauges')}>
                    <GaugeGrid gauges={gauges} onGaugeSelect={onGaugeSelect}/>
                </Panel>
                <HeartBeat heartbeat={heartbeat}/>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    gauges: state.dashboard.gauges,
    heartbeat: state.dashboard.heartbeat
});

const mapDispatchToProps = (dispatch) => ({
    onGaugeSelect: (selected) => dispatch(onGaugeSelect(selected)),
    getRealTimeData: (selected) => dispatch(getRealTimeData()),
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(GaugeView);
