import React, {
  Component,
  ReactNode,
  lazy,
} from 'react';
import {
    Switch,
    Route,
    Redirect,
    RouteComponentProps,
} from 'react-router';
import { connect } from 'react-redux';
import { Avatar, Divider, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import { getFacebookLoginUrl, getGoogleLoginUrl } from 'services/requestUrl';
import { lazyRenderer } from 'services/renderer/lazyRenderer';
import { ILoginStore } from '../../reducers/login';
import logo from '../../assets/logo_text.png';
import background from '../../assets/bg.jpg';
import styles from './index.module.scss';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

export interface AuthenticationProps extends RouteComponentProps {
    login: ILoginStore
}

export class Authentication extends Component<AuthenticationProps, {}> {
    renderSwitchLink = (): ReactNode => {
        const { location: { pathname } } = this.props;

        if (pathname.split('/').slice(-1)[0] === 'login') {
            return (
                <div className={styles.switchFormLink}>
                    <Trans i18nKey="AUTH_NO_ACCOUNT" />
                    <Link to="/authentication/register">
                        <Trans i18nKey="AUTH_REGISTER" />
                    </Link>
                </div>
            );
        }

        return (
            <div className={styles.switchFormLink}>
                <Link to="/authentication/login">
                    Looking to <b>login</b> ?
                </Link>
            </div>
        );
    };

    renderAuthFooter = (): ReactNode => (
        <div className={styles.authFormFooter}>
            <div>
                <a
                    className={styles.socialLoginLink}
                    href={getFacebookLoginUrl()}
                >
                    <Icon type="facebook" />
                </a>
                <a
                    className={styles.socialLoginLink}
                    href={getGoogleLoginUrl()}
                >
                    <Icon type="google" />
                </a>
            </div>
            <Divider
                className={styles.divider}
                type="vertical"
            />
            {this.renderSwitchLink()}
        </div>
    );

    render() {
        const { location, match, login } = this.props;
        const { token } = login;

        if (token)
            return <Redirect to="/app" />;

        return (
            <div className={styles.authPageContainer} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.authContainer}>
                    <div className={`${styles.authElement} ${styles.authForm}`}>
                        <Avatar size={64} icon="user"/>
                        <Switch location={location}>
                            <Route path={`${match.url}/login`} render={props => lazyRenderer(Login, { ...props, loading: login.loading })} />
                            <Route path={`${match.url}/register`} render={props => lazyRenderer(Register, props)} />
                        </Switch>
                        {this.renderAuthFooter()}
                    </div>
                    <div className={`${styles.authElement} ${styles.authRight}`}>
                        <img alt="LC-logo" className={styles.logo} src={logo} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ login }: any) => ({
    login,
}))(Authentication);