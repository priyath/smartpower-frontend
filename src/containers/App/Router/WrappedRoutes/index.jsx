import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import Dashboard from '../../../Dashboard/index';
import History from '../../../History/index';
import Branches from '../../../Branches/index';
import Locations from '../../../Locations/index';
import UserList from '../../../ControlPanel/UserList/index';
import UserAdd from '../../../ControlPanel/Add/index';

export default () => (
    <div>
        <Layout />
        <div className="container__wrap">
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/history" component={History} />
            <Route path="/branches" component={Branches} />
            <Route path="/locations" component={Locations} />
            <Route path="/control_panel/users" component={UserList} />
            <Route path="/control_panel/users_add" component={UserAdd} />
        </div>
    </div>
);
