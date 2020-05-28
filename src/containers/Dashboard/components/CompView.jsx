import React from 'react';
import Panel from "../../../shared/components/Panel";
import HighComp from "./comparison/HighComp";
import {ResponsiveContainer} from "recharts";
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
import CompControl from "./comparison/CompControl";
import { Row } from 'reactstrap';

const CompView = ({ t, dir, themeName, compKeys, getComparisonData }) => {
    return (
        <Row>
            <CompControl
                getComparisonData={getComparisonData}
            />
            <Panel md={12} lg={12} xl={12} sm={12} xs={12} title={t('dashboard.comp_view')}>
                <ResponsiveContainer height={600}>
                    <HighComp
                        compKeys={compKeys}
                    />
                </ResponsiveContainer>
            </Panel>
        </Row>
    );
};

export default connect(state => ({ themeName: state.theme.className }))(withTranslation('common')(CompView));
