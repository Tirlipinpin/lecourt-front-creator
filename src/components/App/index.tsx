import React, { FunctionComponent, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, Router, RouteComponentProps } from 'react-router';
import { Icon } from 'antd';
import axios from 'axios';
import Loader from 'components/shared/Loader';
import { logout } from '../../actions';
import { getManagementUrl } from '../../services/requestUrl';
import axiosInterceptor from '../../services/axiosInterceptor';
import { ILoginStore } from '../../reducers/login';
import { Sidebar } from './Sidebar';
import { fetchUserInitApp } from './actions';
import styles from './index.module.scss';
import './index.scss';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Movies = lazy(() => import('./Movies'));
const Campaigns = lazy(() => import('./Campaigns'));
const CampaignEdit = lazy(() => import('./Campaigns/Edit'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));

interface IAppProps extends RouteComponentProps {
    login: ILoginStore
}

const lazyRender = (Child: React.LazyExoticComponent<any>, props: RouteComponentProps) => (
    <Suspense
        fallback={(
            <Icon type="loading" />
        )}
    >
        <Child { ...props } />
    </Suspense>
);

export const App: FunctionComponent<IAppProps> = (props) => {
    const dispatch = useDispatch();
    const { history, match } = props;
    const login: ILoginStore = useSelector((state: any) => state.login);
    const isReady: boolean = useSelector((state: any) => state.user.isReady);

    useEffect(() => {
        const { token } = login;

        axiosInterceptor(() => {
            dispatch(logout());
            history.push('/');
        });

        if (!token) return;

        axios.defaults.baseURL = getManagementUrl();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        dispatch(fetchUserInitApp());
    }, [dispatch, history, login]);

    if (!login.token) return <Redirect to="/authentication/login" />;

    if (!isReady) {
        return(
            <div className={styles.appLoading}>
                <Loader className={styles.loader} size="3vw" />
            </div>
        );
    }

    return (
      <div className={styles.appWrapper}>
          <div className={styles.layout}>
              <Sidebar {...props} />
              <div className={styles.appContainer}>
                  <div className={styles.contentContainer}>
                      <Router history={props.history}>
                          <Switch>
                              <Route exact path={match.url} render={(props) => lazyRender(Dashboard, props)} />
                              <Route path={`${match.path}/profile`} render={(props) => lazyRender(Profile, props)}/>
                              <Route exact path={`${match.path}/movies`} render={(props) => lazyRender(Movies, props)}/>
                              <Route exact path={`${match.path}/campaigns`} render={(props) => lazyRender(Campaigns, props)}/>
                              <Route path={`${match.path}/campaigns/:id`} render={(props) => lazyRender(CampaignEdit, props)}/>
                              <Route path={`${match.path}/adminDashboard`} render={(props) => lazyRender(AdminDashboard, props)}/>
                          </Switch>
                      </Router>
                  </div>
                  <div className={styles.footer}>
                      Lecourt ©2019 Created with <Icon type="heart" /> by the best developers ever
                  </div>
              </div>
          </div>
      </div>
  );
};

export default App;
