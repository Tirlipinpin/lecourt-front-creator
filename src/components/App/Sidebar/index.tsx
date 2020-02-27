import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Icon, Popover } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IUserStore } from 'reducers/rootReducer';
import logo from 'assets/Logo.png';
import { logout } from 'actions';
import styles from './index.module.scss';

export interface ISidebarProps extends RouteComponentProps {}

const AdminDashboardSubItems = (activeItem: string) => (
    <div className={styles.dashboardSubItems}>
        <Link to="/app/adminDashboard/persons" className={`${styles.item} ${activeItem.includes(':persons') ? styles.activeItem : ''}`}>
            <Icon type="team" />
        </Link>
        <Link to="/app/adminDashboard/genres" className={`${styles.item} ${activeItem.includes(':genres') ? styles.activeItem : ''}`}>
            <Icon type="woman" />
        </Link>
        <Link to="/app/adminDashboard/countries" className={`${styles.item} ${activeItem.includes(':countries') ? styles.activeItem : ''}`}>
            <Icon type="global" />
        </Link>
    </div>
);

export const Sidebar: FunctionComponent<ISidebarProps> = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { avatarUrl, role }: IUserStore = useSelector((state: any) => state.user, shallowEqual);

    const onLogout = () => {
        dispatch(logout());

        Cookies.remove('user_authorization', {
            domain: process.env.REACT_APP_DOMAIN_URL,
        });
        window.location.href = process.env.REACT_APP_FRONT_URL!;
    };

    const getActiveKey = (): string => {
        const { location } = props;
        const pathname = location.pathname.split('/');

        if (pathname[2] === 'adminDashboard') return `${pathname[2]}:${pathname[3]}`;

        return pathname[2] || 'dashboard';
    };

    return (
        <nav className={styles.sidebar}>
            <img alt="lecourt" className={styles.logo} src={logo} />
            <Link to="/app" className={`${styles.item} ${getActiveKey() === 'dashboard' ? styles.activeItem : ''}`}>
                <Icon type="pie-chart" theme="filled" />
            </Link>
            <Link to="/app/movies" className={`${styles.item} ${getActiveKey() === 'movies' ? styles.activeItem : ''}`}>
                <Icon type="unordered-list" />
            </Link>
            <Link to="/app/campaigns" className={`${styles.item} ${getActiveKey() === 'campaigns' ? styles.activeItem : ''}`}>
                <Icon type="flag" theme="filled" />
            </Link>
            {['CONTENT_ADMIN', 'SUPERADMIN'].includes(role) && (
                <Popover content={AdminDashboardSubItems(getActiveKey())}
                         overlayClassName={styles.dashboardSubItemsPopover} arrowPointAtCenter placement="bottom">
                    <div
                        className={`${styles.item} ${styles.multiItems} ${getActiveKey().includes('adminDashboard') ? styles.activeItem : ''}`}>
                        <Icon type="appstore" theme="filled"/>
                    </div>
                </Popover>
                )
            }
            <div className={`${styles.item} ${styles.logout}`}>
                <Popover
                    overlayClassName={styles.logoutPopover}
                    content={<span onClick={onLogout}>{t('LOGOUT')}</span>}
                    placement="right"
                    trigger="hover"
                >
                    <img alt="" className={styles.avatar} src={avatarUrl} />
                </Popover>
            </div>
        </nav>
    );
};

