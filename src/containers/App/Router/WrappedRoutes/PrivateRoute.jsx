import React from "react";
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component, render, ...rest }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (
        <Route {...rest} exact
               render = {(props) => (
                   currentUser && currentUser.accessToken ? (
                       render ? render(props) :
                           <div>
                               {React.createElement(component, props)}
                           </div>
                       ) :
                       (
                           <Redirect
                               to={{
                                   pathname: '/login',
                                   state: { from: props.location }
                               }}
                           />
                       )
               )}
        />
    )
}

export default PrivateRoute;
