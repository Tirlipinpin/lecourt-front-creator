import React, {
    Component, Dispatch, Fragment, FormEvent, SyntheticEvent,
} from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Tooltip, Typography, Checkbox } from 'antd';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import './index.css';

const { Item } = Form;

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
            <Fragment>
                <Typography.Title level={3} className="auth-form-title">
                    <Trans i18nKey='LOGIN' />
                </Typography.Title>
                <Form onSubmit={this.fetchToken} className="auth-form-container">
                    <Item
                        label="Email"
                        colon={false}
                        className="auth-form-item"
                    >
                        <Input
                            allowClear
                            required
                            prefix={<Icon type="mail" />}
                            value={email}
                            onChange={this.handleEmail}
                            suffix={
                                <Tooltip title="Email address">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Item
                        label="Password"
                        colon={false}
                        className="auth-form-item"
                    >
                        <Input
                            allowClear
                            required
                            prefix={<Icon type="lock" />}
                            value={password}
                            onChange={this.handlePassword}
                            type="password"
                            suffix={
                                <Tooltip title="Password">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Checkbox className="auth-form-checkbox">Remember me</Checkbox>
                    <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        className="auth-form-button"
                        block={true}
                    >
                        <Trans i18nKey="LOGIN" />
                    </Button>

                    <Trans i18nKey="AUTH_NO_ACCOUNT" /> <Link to="/authentication/register"><b><Trans i18nKey="AUTH_REGISTER" /></b></Link>
                </Form>
            </Fragment>
        );
    }
};

export default connect()(Login);
