import React, {Component} from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./realtime/GaugeGrid";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {connect} from "react-redux";
import { Row } from 'reactstrap';
import LiveChart from "./realtime/LiveChart";

class RealtimeView extends Component {
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
                    data={gauges[selectedGaugeIdx]}
                    getRealTimeData={this.props.getRealTimeData}
                    selectedGaugeIdx={selectedGaugeIdx} // TODO: read this from the selected gauge itself
                />
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(RealtimeView);
