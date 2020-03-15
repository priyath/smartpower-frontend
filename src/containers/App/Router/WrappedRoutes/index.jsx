import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import Dashboard from '../../../Dashboard/index';
import History from '../../../History/index';
import Branches from '../../../Branches/index';
import Locations from '../../../Locations/index';

export default () => (
    <div>
        <Layout />
        <div className="container__wrap">
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/history" component={History} />
            <Route path="/branches" component={Branches} />
            <Route path="/locations" component={Locations} />
        </div>
    </div>
);
