import React, { Component, Dispatch, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, Router, RouteComponentProps } from 'react-router';
import { Icon, Layout } from 'antd';
import axios from 'axios';
import { getManagementUrl } from '../../services/requestUrl';
import { collapseNavbar } from './Navbar/actions';
import axiosInterceptor from '../../services/axiosInterceptor';
import { ILoginStore } from '../../reducers/login';
import Navbar from './Navbar';
import styles from './index.module.scss';
import './index.scss';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Movies = lazy(() => import('./Movies'));
const MovieDetails = lazy(() => import('./Movies/MovieDetails'));
const Campaigns = lazy(() => import('./Campaigns'));
const CampaignEdit = lazy(() => import('./Campaigns/Edit'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));

interface AppProps extends RouteComponentProps {
    login: ILoginStore
    dispatch: Dispatch<any>
    collapsed: boolean
}

export class App extends Component<AppProps, {}> {
    componentDidMount() {
        const { history, dispatch, login } = this.props;
        const { token } = login;

        axiosInterceptor(() => {
            dispatch({ type: 'LOGOUT' });
            history.push('/');
        });

        axios.defaults.baseURL = getManagementUrl();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    onCollapse = (collapsed: boolean) => {
        const { dispatch } = this.props;

        dispatch(collapseNavbar(collapsed));
    };

    lazyRender = (Child: React.LazyExoticComponent<any>, props: RouteComponentProps) => (
        <Suspense
            fallback={(
                <Icon type="loading" />
            )}
        >
            <Child { ...props } />
        </Suspense>
    );

    render() {
        const { match, login, collapsed } = this.props;

        if (!login.token)
            return (
                <Redirect to="/authentication/login" />
            );

        return (
            <div className={styles.appWrapper}>
                <Layout>
                    <Layout.Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={this.onCollapse}
                        theme="light"
                        className={styles.navbarContainer}
                    >
                        <Navbar { ...this.props } collapsed={collapsed} />
                    </Layout.Sider>
                    <Layout className={styles.appContainer}>
                        <Layout.Content className={`${styles.contentContainer} ${collapsed && styles.contentContainerExtended}`}>
                            <Router history={this.props.history}>
                                <Switch>
                                    <Route exact path={match.url} render={(props) => this.lazyRender(Dashboard, props)} />
                                    <Route path={`${match.path}/profile`} render={(props) => this.lazyRender(Profile, props)}/>
                                    <Route exact path={`${match.path}/movies`} render={(props) => this.lazyRender(Movies, props)}/>
                                    <Route path={`${match.path}/movies/:id`} render={(props) => this.lazyRender(MovieDetails, props)}/>
                                    <Route exact path={`${match.path}/campaigns`} render={(props) => this.lazyRender(Campaigns, props)}/>
                                    <Route path={`${match.path}/campaigns/:id`} render={(props) => this.lazyRender(CampaignEdit, props)}/>
                                    <Route path={`${match.path}/adminDashboard`} render={(props) => this.lazyRender(AdminDashboard, props)}/>
                                </Switch>
                            </Router>
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
