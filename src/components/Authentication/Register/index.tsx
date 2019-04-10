import React, { Component, Dispatch, FormEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Typography, Tooltip } from 'antd';
import { Trans } from 'react-i18next';

import { RegisterStore } from '../../../reducers/register';

import './index.css';

export interface RegisterState {
    displayName: string
    email: string
    password: string
    passwordConfirm: string
};

export interface RegisterProps {
    dispatch: Dispatch<any>
    register: RegisterStore
};

export class Register extends Component<RegisterProps, RegisterState> {
    state = {
        displayName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    registerUser = (e: FormEvent<any>): void => {
        const { displayName, email, password, passwordConfirm } = this.state;
        const { dispatch } = this.props;

        e.preventDefault();

        dispatch({
            type: 'REGISTER_USER',
            payload: {
                displayName,
                email,
                password,
                passwordConfirm,
            }
        });
    }

    handleDisplayName = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        this.setState({
            displayName: target.value,
        });
    }

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

    handlePasswordConfirm = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            passwordConfirm: target.value,
        });
    }

    render() {
        const { displayName, email, password, passwordConfirm } = this.state;
        const { register } = this.props;
    
        return (
            <>
                <Typography.Title level={1}>
                    <Trans i18nKey="REGISTER" />
                </Typography.Title>
                <Form onSubmit={this.registerUser}>
                    <Input
                        className="auth-form-item" allowClear required
                        prefix={<Icon type="user" />}
                        value={displayName}
                        onChange={this.handleDisplayName}
                        placeholder='Display name'
                        suffix={
                            <Tooltip title="Display name">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />        
                    <Input
                        className="auth-form-item" allowClear required
                        prefix={<Icon type="mail" />}
                        value={email}
                        onChange={this.handleEmail}
                        placeholder='Email'
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
                        placeholder='Password'
                        type='password'
                        suffix={
                            <Tooltip title="Password">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                    <Input
                        className="auth-form-item" allowClear required
                        prefix={<Icon type="lock" />}
                        value={passwordConfirm}
                        onChange={this.handlePasswordConfirm}
                        placeholder='Password (confirmation)'
                        type='password'
                        suffix={
                            <Tooltip title="Password (confirmation), the same as the previous password">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                    <Button
                        className="auth-form-button"
                        htmlType="submit"
                        type="primary"
                        disabled={register.loading}
                        shape="round"
                        block
                    >
                        <Trans i18nKey="REGISTER" />
                    </Button>
                    <a href="/">Looking to <b>login</b> ?</a>
                </Form>
            </>
        );
    }
}

export default connect(({ register }: any) => ({
    register,
}))(Register);
