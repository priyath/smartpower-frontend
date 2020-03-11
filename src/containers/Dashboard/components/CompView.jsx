import React from 'react';
import Panel from "../../../shared/components/Panel";
import CompBar from "./CompBar";
import {ResponsiveContainer} from "recharts";
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";

const CompView = ({ t, dir, themeName }) => {
    return (
        <Panel md={12} lg={12} xl={8} sm={12} xs={12} title={t('dashboard.comp_view')}>
            <ResponsiveContainer height={500}>
                    <CompBar/>
            </ResponsiveContainer>
        </Panel>

    );
};

export default connect(state => ({ themeName: state.theme.className }))(withTranslation('common')(CompView));