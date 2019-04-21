import React, { Component, Dispatch, Suspense, lazy, LazyExoticComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { Icon, Layout } from 'antd';
import axios from 'axios';

import Navbar from './Navbar';
const Homepage = lazy(() => import('./Homepage'));
const Profile = lazy(() => import('./Profile'));
const Upload = lazy(() => import('./Upload'));

import axiosInterceptor from '../../services/axiosInterceptor';
import { LoginStore } from '../../reducers/login';

import './index.css';
import { collapseNavbar } from './Navbar/actions';

interface AppProps {
    match: any
    history: any
    location: any
    login: LoginStore
    dispatch: Dispatch<any>
    collapsed: boolean
}

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        const { history, dispatch, login } = this.props;
        // const { token } = login;

        axiosInterceptor(() => {
            dispatch({ type: 'LOGOUT' });
            history.push('/');
        });

        axios.defaults.baseURL = 'https://management.stg.lecourt.tv/';
        axios.defaults.headers.common['Authorization'] = `changeIt`;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    onCollapse = (collapsed: boolean) => {
        const { dispatch } = this.props;

        dispatch(collapseNavbar(collapsed));
    }

    lazyRender = (Child: React.LazyExoticComponent<React.ComponentType>) => (
        <Suspense
            fallback={(
                <Icon type="loading" />
            )}
        >
            <Child { ...this.props } />
        </Suspense>
    )

    render() {
        const { match, login, collapsed } = this.props;

        if (!login.token)
            return (
                <Redirect to="/authentication/login" />
            );

        return (
            <div className="app-wrapper">
                <Layout>
                    <Layout.Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={this.onCollapse}
                        theme="light"
                        className="navbar-container"
                    >
                        <Navbar { ...this.props } collapsed={collapsed} />
                    </Layout.Sider>
                    <Layout className="app-container">
                        <Layout.Content className={`content-container ${collapsed && 'content-container-extended'}`}>
                            <Switch>
                                <Route exact path={match.url} render={() => this.lazyRender(Homepage)} />
                                <Route path={`${match.path}/profile`} render={() => this.lazyRender(Profile)}/>
                                <Route path={`${match.path}/upload`} render={() => this.lazyRender(Upload)}/>
                            </Switch>
                        </Layout.Content>
                        <Layout.Footer style={{
                            textAlign: 'center',
                            background: 'white',
                        }}>
                            Lecourt ©2019 Created with <Icon type="heart" /> by the best developers ever
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default connect(({ login, navbar }: any) => ({
    login,
    collapsed: navbar.collapsed,
}))(App);
