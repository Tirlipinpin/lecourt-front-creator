import React, { Component, Dispatch, Fragment } from 'react';
import { Menu, Icon } from 'antd';
import {Link, RouteComponentProps} from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../../assets/Logo.png';
import './index.css';
import { LOGOUT } from '../../../reducers/login/constants';

const { SubMenu } = Menu;

interface NavbarProps extends RouteComponentProps {
    dispatch: Dispatch<any>
    collapsed: boolean
}

export class Navbar extends Component<NavbarProps, {}> {
    logout = () => {
        const { dispatch, history } = this.props;

        dispatch({
            type: LOGOUT,
        });

        history.push('/');
    };

    getActiveKey = (): string[] => {
        const { location } = this.props;
        const pathname = location.pathname.split('/');

        if (pathname[2] === 'adminDashboard') return [`${pathname[2]}:${pathname[3]}`];

        return [
            pathname[2] || 'dashboard',
        ];
    };

    renderMenuItemContent = (iconType: string, title: string, submenu?: boolean) => {
        const { collapsed } = this.props;

        if (collapsed && !submenu) return <Icon type={iconType} />;

        return (
            <Fragment>
                <Icon type={iconType} />
                {title}
            </Fragment>
        );
    };

    render() {
        const { history, collapsed } = this.props;
        const { url } = this.props.match;

        return (
            <Fragment>
                <div className={collapsed ? 'collapsed-logo' : 'navbar-logo'}>
                    <img src={logo} onClick={() => history.push(url)} alt="Lecourt" />
                    <span className="lecourt-title">
                        { !collapsed && 'Lecourt' }
                    </span>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    style={{ lineHeight: '64px' }}
                    className={`menu-items-container navbar-menu ${!collapsed && 'not-collapsed'}`}
                    selectedKeys={this.getActiveKey()}
                >
                    <Menu.Item
                        className="navbar-menu-item"
                        key="dashboard"
                        title="Dashboard"
                    ><Link to='/app'>
                        {this.renderMenuItemContent('pie-chart', 'Dasboard')}
                    </Link></Menu.Item>
                    <Menu.Item
                        className="navbar-menu-item"
                        key="profile"
                        title="Profile"
                    ><Link to='/app/profile'>
                        {this.renderMenuItemContent('user', 'Profile')}
                    </Link></Menu.Item>
                    <Menu.Item
                        className="navbar-menu-item"
                        key="movies"
                        title="films"
                    ><Link to='/app/movies'>
                        {this.renderMenuItemContent('unordered-list', 'Films')}
                    </Link></Menu.Item>
                    <Menu.Item
                        className="navbar-menu-item"
                        key="campaigns"
                        title="campagnes"
                    ><Link to='/app/campaigns'>
                        {this.renderMenuItemContent('flag', 'Campagnes')}
                    </Link></Menu.Item>
                    <SubMenu
                        className="navbar-submenu"
                        popupClassName="navbar-submenu-popup"
                        key="adminDashboard"
                        title={
                            <span>
                                {this.renderMenuItemContent('appstore', 'Admin dashboard')}
                            </span>
                        }
                    >
                        <Menu.Item
                            className="navbar-menu-item"
                            key="adminDashboard:persons"
                            title="Persons"
                        ><Link to='/app/adminDashboard/persons'>
                            {this.renderMenuItemContent('team', 'Persons', true)}
                        </Link></Menu.Item>
                        <Menu.Item
                            className="navbar-menu-item"
                            key="adminDashboard:genres"
                            title="Genres"
                        ><Link to='/app/adminDashboard/genres'>
                            {this.renderMenuItemContent('woman', 'Genres', true)}
                        </Link></Menu.Item>
                        <Menu.Item
                            className="navbar-menu-item"
                            key="adminDashboard:countries"
                            title="Countries"
                        ><Link to='/app/adminDashboard/countries'>
                            {this.renderMenuItemContent('global', 'Countries', true)}
                        </Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        className="logout-button navbar-menu-item"
                        key="logout"
                        onClick={this.logout}
                        title="logout"
                    >
                        {this.renderMenuItemContent('logout', 'Logout')}
                    </Menu.Item>
                </Menu>
            </Fragment>
        );
    }
}

export default connect(({ navbar }: any) =>({
    navbar,
}))(Navbar);
