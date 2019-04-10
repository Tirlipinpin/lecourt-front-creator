import React, { Component, Dispatch, SyntheticEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import { Redirect } from 'react-router';

import { LoginStore } from '../../reducers/login';

import './index.css';

export interface LoginProps {
    dispatch: Dispatch<any>
    login: LoginStore
};

export interface LoginState {
    email: string
    password: string
};

export class Login extends Component<LoginProps, LoginState> {
    state = {
        email: '',
        password: '',
    };

    handleEmail = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            email: target.value,
        });
    }

    handlePassword = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            password: target.value,
        });
    }

    fetchToken = (e: FormEvent<any>): void => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        e.preventDefault();

        dispatch({
            type: 'FETCH_TOKEN',
            payload: {
                email,
                password,
            },
        });
    }

    render() {
        const { login } = this.props;
        const { email, password } = this.state;

        return (
            <div className="login-form">
            { login.token && <Redirect to="/app" /> }
                <h1>Log in to Lecourt</h1>
                <Form onSubmit={this.fetchToken}>
                    <Form.Item
                        help="Enter your email"
                    >
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} value={email} onChange={this.handleEmail} />
                    </Form.Item>
                    <Form.Item
                        help="Enter your password"
                    >
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} value={password} type="password" onChange={this.handlePassword} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={login.loading}
                            htmlType="submit"
                            type="primary"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                        Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
};

const mapStateToProp = ({ login }: any) => ({ login });

export default connect(mapStateToProp)(Login);
