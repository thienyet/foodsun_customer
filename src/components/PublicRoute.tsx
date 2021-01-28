import React from 'react';
import { Route, Router, Redirect, RouteProps} from 'react-router-dom';


const PublicRoute: React.FC<RouteProps> =  ({ children, ...rest }) => {

    const checkAuth = () => {
        return true;
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

export default PublicRoute;