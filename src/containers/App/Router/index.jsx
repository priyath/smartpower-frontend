import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import LogIn from '../../LogIn/index';
import WrappedRoutes from './WrappedRoutes';

const Router = () => (
    <MainWrapper>
        <main>
            <Switch>
                <Route exact path="/" component={LogIn} />
                <Route exact path="/login" component={LogIn} />
                <Route path="/" component={WrappedRoutes} />
            </Switch>
        </main>
    </MainWrapper>
);

export default Router;
