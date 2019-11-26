import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Cookies from 'js-cookie';
import qs from 'query-string';
import Loader from 'components/shared/Loader';

export interface ILoginFromExternal extends RouteComponentProps {}

export class LoginFromExternal extends Component<ILoginFromExternal> {
  componentDidMount() {
    const { location: { search } } = this.props;
    const { expires_in, token } = qs.parse(search);

    if (expires_in && token && typeof token === 'string') {
        Cookies.set('user_authorization', token, {
            expires: new Date(Date.now() + +expires_in),
            domain: process.env.REACT_APP_DOMAIN_URL,
          });
    } else if (token && typeof token === 'string') {
        Cookies.set('user_authorization', token, {
          domain: process.env.REACT_APP_DOMAIN_URL,
        });
    }

    window.location.href = process.env.REACT_APP_FRONT_URL!;
  }

  render() {
    return (
      <Loader />
    );
  }
}

export default LoginFromExternal;
