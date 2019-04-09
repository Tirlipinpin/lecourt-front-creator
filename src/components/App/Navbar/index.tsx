import React, { Component, Dispatch } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from './Logo.png';
import './index.css';
import { LOGOUT } from '../../../reducers/login/constantes';

interface NavbarProps {
    match: any
    history: any
    dispatch: Dispatch<any>
    location: any
    collapsed: boolean
};

export class Navbar extends Component<NavbarProps, {}> {
    logout = () => {
        const { dispatch, history } = this.props;

        dispatch({
            type: LOGOUT,
        });

        history.push('/login');
    }

    isActive = (): Array<string> => {
        const { location } = this.props;

        return [
            location.pathname.split('/')[2] || 'homepage',
        ];
    }

    render() {
        const { history, collapsed } = this.props;
        const { url } = this.props.match;

        return (
            <>
                <div className="logo">
                    <img src={logo} onClick={() => history.push(url)} />
                    <span className="lecourt-title">
                        { !collapsed && 'Lecourt' }
                    </span>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    style={{ lineHeight: '64px' }}
                    className={`menu-items-container navbar-menu ${!collapsed && 'not-collapsed'}`}
                    selectedKeys={this.isActive()}
                >
                    <Menu.Item key="homepage"><Link to={url}>
                        { collapsed
                            ? <Icon type="home" />
                            : <> <Icon type="home" /> Homepage </>
                        }
                    </Link></Menu.Item>
                    <Menu.Item key="profile"><Link to={`${url}/profile`}>
                        { collapsed
                            ? <Icon type="user" />
                            : <> <Icon type="user" /> Profile </>
                        }
                    </Link></Menu.Item>
                    <Menu.Item key="logout" className="logout-button" onClick={this.logout}>
                        { collapsed
                            ? <Icon type="logout" />
                            : <> <Icon type="logout" /> Logout </>
                        }
                    </Menu.Item>
                </Menu>
            </>
        );
    }
};

export default connect(({ navbar }: any) =>({
    navbar,
}))(Navbar);
