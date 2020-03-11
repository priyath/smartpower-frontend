import React from 'react';
import Panel from "../../../shared/components/Panel";
import GaugeGrid from "./gauge/GaugeGrid";
import {withTranslation} from "react-i18next";

const GaugeView = (props) => {
    const { t } = props;

    return (
        <Panel md={12} lg={12} xl={6} sm={12} xs={12}  title={t('dashboard.main_gauges')}>
                <GaugeGrid/>
        </Panel>
    );
};

export default withTranslation('common')(GaugeView);