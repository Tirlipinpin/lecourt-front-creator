import React, { Component } from 'react';
import { Switch, Route, match, Redirect } from 'react-router';
import { History, Location } from 'history';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';
import { LoginStore } from '../../reducers/login';

import './index.css';
import logo from '../../assets/Logo.png';

export type AuthenticationProps = {
    match: match
    history: History
    location: Location
    login: LoginStore
}

export class Authentication extends Component<AuthenticationProps, {}> {
    render() {
        const { location, match, login } = this.props

        return (
            <div className="auth-background">
                <div className="auth-container">
                    <img src={logo} className="logo" />
                    <div className="auth-form">
                        { login.token && <Redirect to="/app" /> }
                        <Switch location={location}>
                            <Route path={`${match.url}/login`} render={() => <Login loading={login.loading} />} />
                            <Route path={`${match.url}/register`} component={Register} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({ login }: any) => ({
    login,
}))(Authentication);