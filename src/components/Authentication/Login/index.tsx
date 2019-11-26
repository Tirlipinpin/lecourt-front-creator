import React, {
    Component, Dispatch, Fragment, FormEvent, SyntheticEvent,
} from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Tooltip, Typography, Checkbox } from 'antd';
import { Trans } from 'react-i18next';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from '../index.module.scss';

const { Item } = Form;

export interface LoginProps {
    dispatch: Dispatch<any>
    loading: boolean
};

export interface LoginState {
    email: string
    password: string
    rememberMe: boolean
};

export class Login extends Component<LoginProps, LoginState> {
    state = {
        email: '',
        password: '',
        rememberMe: false,
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

    handleRememberMe = (e: CheckboxChangeEvent) => {
        const { target: { checked } } = e;

        this.setState({
            rememberMe: checked,
        });
    }

    fetchToken = (e: FormEvent<any>): void => {
        const { dispatch } = this.props;
        const { email, password, rememberMe } = this.state;

        e.preventDefault();

        dispatch({
            type: 'FETCH_TOKEN',
            payload: {
                email,
                password,
                rememberMe,
            },
        });
    }

    render() {
        const { email, password } = this.state;
        const { loading } = this.props;

        return (
            <Fragment>
                <Typography.Title level={3} className={styles.authFormTitle}>
                    <Trans i18nKey='LOGIN' />
                </Typography.Title>
                <Form onSubmit={this.fetchToken} className={styles.authFormContainer}>
                    <Item
                        label="Email"
                        colon={false}
                        className={styles.authFormItem}
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
                        className={styles.authFormItem}
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
                    <Checkbox
                        className={styles.authFormCheckbox}
                        onChange={this.handleRememberMe}
                    >Remember me</Checkbox>
                    <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        className={styles.authFormButton}
                        block={true}
                    >
                        <Trans i18nKey="LOGIN" />
                    </Button>
                </Form>
            </Fragment>
        );
    }
};

export default connect()(Login);
