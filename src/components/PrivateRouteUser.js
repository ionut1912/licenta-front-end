import React from 'react'
import { Redirect, Route } from 'react-router-dom';


const PrivateRouteUser = ({ component: Comp, loggedIn, path }) => {
    return (
        <Route
            path={path}
            render={() => {
                return loggedIn &&loggedIn.role==="ROLE_USER" ? (
                    <Comp />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/"
                            }}
                        />
                    );
            }}
        />
    );
};

export default PrivateRouteUser
