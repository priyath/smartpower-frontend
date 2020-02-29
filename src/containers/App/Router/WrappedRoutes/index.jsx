import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import Dashboard from '../../../Dashboard/index';

export default () => (
    <div>
        <Layout />
        <div className="container__wrap">
            <Route path="/dashboard" component={Dashboard} />
        </div>
    </div>
);
