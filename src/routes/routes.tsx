import React from "react"
import Footer from '../components/layout/footer/footer';
import Header from '../components/layout/header/header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {
    HOME,
    LOGIN
} from '../settings/constants';
import Login from '../pages/account/login/login';
import Home from '../pages/home/home';
import NotFound from '../components/NotFound'
import Restaurant from '../pages/restaurant/restaurant';
import DetailsRestaurant from '../pages/restaurant/detailsRestaurant/detailsRestaurant';


import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

import { withRouter } from "react-router";
import { parseJwt } from '../utils/common';

import { Layout } from 'antd';
import Profile from "../pages/profile/profile";
import Cart from "../pages/cart/cart";
import Order from "../pages/order/order";
import RegisterCustomer from "../pages/registerCustomer/registerCustomer";

const RouterURL = withRouter(({ location }) => {

    const checkAuth = () => {
        let author = localStorage.getItem('student');
        if (author)
            return true;
        return false;
    }

    const checkAuth1 = () => {
        let author = parseJwt(localStorage.getItem('student'))
        let _author = author.role;
        if (_author[0].authority === "ROLE_ADMIN")
            return 1;
        if (_author[0].authority === "ROLE_COMPANY")
            return 2;
        return 3;
    }

    const LoginContainer = () => (
        <div className="container">
            <PublicRoute exact path="/">
                <Login />
            </PublicRoute>
            <PublicRoute exact path={LOGIN}>
                <Login />
            </PublicRoute>
            <PublicRoute exact path="/register">
                <RegisterCustomer />
            </PublicRoute>
        </div>
    )

    const DefaultContainer = () => (
        <div>
            {checkAuth() ? <Layout style={{ minHeight: '100vh' }}>
                <Layout style={{ display: 'flex' }}>
                    <Header />
                    <PublicRoute exact path="/">
                        <Home />
                    </PublicRoute>
                    <PublicRoute exact path={HOME}>
                        <Home />
                    </PublicRoute>
                    <PublicRoute exact path="/restaurant">
                        <Restaurant />
                    </PublicRoute>
                    <PublicRoute exact path="/details-restaurant/:id">
                        <DetailsRestaurant />
                    </PublicRoute>

                    <Layout>
                        <Footer />
                    </Layout>
                </Layout>
            </Layout> :
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout style={{ display: 'flex' }}>
                        <Header />
                        <PublicRoute exact path="/">
                            <Home />
                        </PublicRoute>
                        <PublicRoute exact path={HOME}>
                            <Home />
                        </PublicRoute>
                        <PublicRoute exact path="/restaurant">
                            <Restaurant />
                        </PublicRoute>
                        <PublicRoute exact path="/details-restaurant/:id">
                            <DetailsRestaurant />
                        </PublicRoute>
                        <PublicRoute exact path="/cart">
                            <Cart />
                        </PublicRoute>
                        <PublicRoute exact path="/history-order">
                            <Order />
                        </PublicRoute>
                        <PublicRoute path="/profile">
                            <Profile />
                        </PublicRoute>
                        <Layout>
                            <Footer />
                        </Layout>
                    </Layout>
                </Layout>}
        </div>

    )

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <LoginContainer />
                    </Route>
                    <Route exact path="/">
                        <DefaultContainer />
                    </Route>
                    <Route exact path={HOME}>
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/recruitment">
                        <DefaultContainer />
                    </Route>
                    <Route path="/details-restaurant/:id">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/profile">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/restaurant">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/cart">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/history-order">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/register">
                        <LoginContainer />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
})

export default RouterURL;
