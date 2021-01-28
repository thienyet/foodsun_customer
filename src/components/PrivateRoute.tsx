import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';


const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {

    const checkAuth = () => {
        if (localStorage.getItem('token') !== null) return true;
        return false;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                checkAuth() ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;