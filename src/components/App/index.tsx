import React, { Component, Dispatch, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { Icon, Layout } from 'antd';
import axios from 'axios';

import Navbar from './Navbar';
const Homepage = lazy(() => import('./Homepage'));
const Profile = lazy(() => import('./Profile'));

import axiosInterceptor from '../../services/axiosInterceptor';
import { LoginStore } from '../../reducers/login';

import './index.css';

interface AppProps {
    match: any
    history: any
    location: any
    login: LoginStore
    dispatch: Dispatch<any>
}

interface AppState {
    collapsed: boolean
}

export class App extends Component<AppProps, AppState> {
    state: Readonly<AppState> = {
        collapsed: false,
    }

    componentDidMount() {
        const { history, dispatch, login } = this.props;
        // const { token } = login;

        axiosInterceptor(() => {
            dispatch({ type: 'LOGOUT' });
            history.push('/login');
        });

        axios.defaults.baseURL = 'https://management.stg.lecourt.tv/';
        axios.defaults.headers.common['Authorization'] = `changeIt`;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed });
    }

    lazyRender = (Child: React.ComponentType) => (
        <Suspense
            fallback={(
                <Icon type="loading" />
            )}
        >
            <Child { ...this.props } />
        </Suspense>
    )

    render() {
        const { match, login } = this.props;
        const { collapsed } = this.state;

        if (!login.token)
            return (
                <Redirect to="/login" />
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
                        <Layout.Content className="content-container">
                            <Switch>
                                <Route exact path={match.url} render={() => this.lazyRender(Homepage)} />
                                <Route path={`${match.path}/profile`} render={() => this.lazyRender(Profile)}/>
                            </Switch>
                        </Layout.Content>
                        <Layout.Footer style={{
                            textAlign: 'center',
                            background: '#f0f2f5',
                        }}>
                            Lecourt ©2019 Created with <Icon type="heart" /> by the best developpers ever
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default connect(({ login }: any) => ({
    login,
}))(App);
