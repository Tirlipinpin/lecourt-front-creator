import React, { Component, Dispatch, SyntheticEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Tooltip, Typography } from 'antd';
import { Trans } from 'react-i18next';

import './index.css';

export interface LoginProps {
    dispatch: Dispatch<any>
    loading: boolean
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
        const { email, password } = this.state;
        const { loading } = this.props;

        return (
            <>
                <Typography.Title level={1}>
                    <Trans i18nKey='LOGIN' />
                </Typography.Title>
                <Form onSubmit={this.fetchToken}>
                    <Input
                        className="auth-form-item" allowClear required
                        prefix={<Icon type="mail" />}
                        value={email}
                        onChange={this.handleEmail}
                        placeholder="Email"
                        suffix={
                            <Tooltip title="Email address">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                    <Input
                        className="auth-form-item" allowClear required
                        prefix={<Icon type="lock" />}
                        value={password}
                        onChange={this.handlePassword}
                        type="password"
                        placeholder="Password"
                        suffix={
                            <Tooltip title="Password">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                    <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        shape="round"
                        className="auth-form-button"
                        block={true}
                    >
                        <Trans i18nKey="LOGIN" />
                    </Button>
                    <a href="/authentication/register">Looking to <b>register</b> ?</a>
                </Form>
            </>
        );
    }
};

export default connect()(Login);
