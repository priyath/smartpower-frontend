import React from 'react';
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
import { Row} from 'reactstrap';
import TodayStats from "./TodayStats";
import KWValue from "./KWValue";
import Cost from "./Cost";
import {compose} from "redux";

const CompView = ({ t, dir, themeName, todayStats }) => {
    const { consumption, cost } = todayStats;
    return (
        <Row>
            <TodayStats todayStats={todayStats} />
            <KWValue consumption={consumption} />
            <Cost cost={cost}/>
        </Row>
    );
};

const mapStateToProps = (state) => ({
    todayStats: state.dashboard.todayStats
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(CompView);