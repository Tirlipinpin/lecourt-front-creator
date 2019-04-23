import React, { Component, Dispatch } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../../assets/Logo.png';
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

        history.push('/');
    }

    isActive = (): string[] => {
        const { location } = this.props;

        return [
            location.pathname.split('/')[2] || 'dashboard',
        ];
    }

    render() {
        const { history, collapsed } = this.props;
        const { url } = this.props.match;

        return (
            <>
                <div className={collapsed ? 'collapsed-logo' : 'navbar-logo'}>
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
                    <Menu.Item key="dashboard" title="Dashboard"><Link to={url}>
                            { collapsed
                                ? <Icon type="pie-chart" />
                                : <> <Icon type="pie-chart" /> Dashboard </>
                            }
                    </Link></Menu.Item>
                    <Menu.Item key="profile" title="Profile"><Link to={`${url}/profile`}>
                        { collapsed
                            ? <Icon type="user" />
                            : <> <Icon type="user" /> Profile </>
                        }
                    </Link></Menu.Item>
                    <Menu.Item key="upload" title="Upload"><Link to={`${url}/upload`}>
                        { collapsed
                            ? <Icon type="plus" />
                            : <> <Icon type="plus" /> Upload </>
                        }
                    </Link></Menu.Item>
                    <Menu.Item key="campaign" title="Campagne de diffusion"><Link to={`${url}/campaign`}>
                        { collapsed
                            ? <Icon type="calendar" />
                            : <> <Icon type="calendar" /> Campagne de diffusion </>
                        }
                    </Link></Menu.Item>
                    <Menu.Item key="logout" className="logout-button" onClick={this.logout} title="logout">
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
