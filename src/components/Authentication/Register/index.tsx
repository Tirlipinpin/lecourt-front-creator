import React, { Component, Dispatch, Fragment, FormEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Typography, Tooltip } from 'antd';
import { Trans } from 'react-i18next';
import { RegisterStore } from '../../../reducers/register';
import './index.css';

const { Item } = Form;

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
            <Fragment>
                <Typography.Title level={1} className="auth-form-title">
                    <Trans i18nKey="REGISTER" />
                </Typography.Title>
                <Form onSubmit={this.registerUser} className="auth-form-container">
                    <Item
                        className="auth-form-item"
                        label="Display name"
                        colon={false}
                    >
                        <Input
                            allowClear
                            required
                            prefix={<Icon type="user" />}
                            value={displayName}
                            onChange={this.handleDisplayName}
                            suffix={
                                <Tooltip title="Display name">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Item
                        className="auth-form-item"
                        label="Email"
                        colon={false}
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
                        className="auth-form-item"
                        label="Password"
                        colon={false}
                    >
                        <Input
                            allowClear
                            required
                            prefix={<Icon type="lock" />}
                            value={password}
                            onChange={this.handlePassword}
                            type='password'
                            suffix={
                                <Tooltip title="Password">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Item
                        className="auth-form-item"
                        label="Password (confirmation)"
                        colon={false}
                    >
                        <Input
                            allowClear
                            required
                            prefix={<Icon type="lock" />}
                            value={passwordConfirm}
                            onChange={this.handlePasswordConfirm}
                            type='password'
                            suffix={
                                <Tooltip title="Password (confirmation), the same as the previous password">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Item>
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
            </Fragment>
        );
    }
}

export default connect(({ register }: any) => ({
    register,
}))(Register);
