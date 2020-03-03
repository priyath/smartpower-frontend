import React from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./gauge/GaugeGrid";

const GaugeView = (props) => {
    return (
        <Panel md={12} lg={12} xl={6} sm={12} xs={12}  title='dashboard.ab_testing'>
                <GaugeGrid/>
        </Panel>
    );
};

export default GaugeView;