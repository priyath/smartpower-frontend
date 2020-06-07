import React from 'react';
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
import { Row} from 'reactstrap';
import TodayStats from "./stats/TodayStats";
import KWValue from "./stats/KWValue";
import Cost from "./stats/Cost";
import {compose} from "redux";

const CompView = ({ t, dir, themeName, todayStats }) => {
    const { cost } = todayStats;
    return (
        <Row>
            <TodayStats todayStats={todayStats} />
            <KWValue todayStats={todayStats} />
            <Cost cost={cost}/>
        </Row>
    );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(CompView);
