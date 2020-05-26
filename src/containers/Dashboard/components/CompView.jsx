import React from 'react';
import Panel from "../../../shared/components/Panel";
import CompBar from "./comparison/CompBar";
import {ResponsiveContainer} from "recharts";
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
import CompControl from "./comparison/CompControl";
import { Row } from 'reactstrap';

const CompView = ({ t, dir, themeName }) => {
    return (
        <Row>
            <CompControl/>
            <Panel md={12} lg={12} xl={12} sm={12} xs={12} title={t('dashboard.comp_view')}>
                <ResponsiveContainer height={500}>
                    <CompBar/>
                </ResponsiveContainer>
            </Panel>
        </Row>
    );
};

export default connect(state => ({ themeName: state.theme.className }))(withTranslation('common')(CompView));
