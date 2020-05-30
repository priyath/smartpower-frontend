import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import Dashboard from '../../../Dashboard/index';
import History from '../../../History/index';
import Branches from '../../../Branches/index';
import Locations from '../../../Locations/index';
import UserList from '../../../ControlPanel/UserList/index';
import UserAdd from '../../../ControlPanel/Add/index';
import Alerts from '../../../Alerts/index';
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import WithLoading from "./HOCLoader";

class WrappedRoutes extends Component {

    constructor() {
        super();
    }

    render() {
        const { initialLoad } = this.props;
        const DashboardWithLoading = WithLoading(Dashboard);
        const AlertWithLoading = WithLoading(Alerts);
        const HistoryWithLoading = WithLoading(History);
        const BranchesWithLoading = WithLoading(Branches);
        return (
            <div>
                <Layout />
                {
                    <div className="container__wrap">
                        <Route path="/dashboard" render={() => <DashboardWithLoading isLoading={!(initialLoad)}/>}/>
                        <Route path="/history" render={() => <HistoryWithLoading isLoading={!(initialLoad)}/>}/>
                        <Route path="/branches" render={() => <BranchesWithLoading isLoading={!(initialLoad)}/>}/>
                        <Route path="/locations" component={Locations}/>
                        <Route path="/alerts" render={() => <AlertWithLoading isLoading={!(initialLoad)}/>}/>
                        <Route path="/control_panel/users" component={UserList}/>
                        <Route path="/control_panel/users_add" component={UserAdd}/>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    rtl: state.rtl,
    initialLoad: state.topbar.initialLoad,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps), )(WrappedRoutes);
