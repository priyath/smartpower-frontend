import React, {Component} from 'react';
import Layout from '../../../Layout/index';
import Dashboard from '../../../Dashboard/index';
import History from '../../../History/index';
import Branches from '../../../Branches/index';
import Locations from '../../../Locations/index';
import UserList from '../../../ControlPanel/UserList/index';
import UserAdd from '../../../ControlPanel/Add/index';
import Thresholds from '../../../ControlPanel/Thresholds/index';
import BranchConfig from '../../../ControlPanel/Branches/index';
import Alerts from '../../../Alerts/index';
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import WithLoading from "./HOCLoader";
import PrivateRoute from "./PrivateRoute";

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
        const LocationsWithLoading = WithLoading(Locations);
        return (
            <div>
                <Layout />
                {
                    <div className="container__wrap">
                        <PrivateRoute path="/dashboard" render={() => <DashboardWithLoading isLoading={!(initialLoad)}/>}/>
                        <PrivateRoute path="/history" render={() => <HistoryWithLoading isLoading={!(initialLoad)}/>}/>
                        <PrivateRoute path="/branches" render={() => <BranchesWithLoading isLoading={!(initialLoad)}/>}/>
                        <PrivateRoute path="/alerts" render={() => <AlertWithLoading isLoading={!(initialLoad)}/>}/>
                        <PrivateRoute path="/locations" render={() => <LocationsWithLoading isLoading={!(initialLoad)}/>}/>
                        <PrivateRoute path="/control_panel/users" component={UserList}/>
                        <PrivateRoute path="/control_panel/users_add" component={UserAdd}/>
                        <PrivateRoute path="/control_panel/thresholds" component={Thresholds}/>
                        <PrivateRoute path="/control_panel/branches" component={BranchConfig}/>
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
