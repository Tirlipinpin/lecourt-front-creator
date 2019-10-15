import React from 'react';
import { Layout, PageHeader } from 'antd';

import AdminDashboardContent from './AdminDashboardContent';
import './index.css';
import { RouteComponentProps } from 'react-router';

export interface IAdminDashboardProps extends RouteComponentProps {};

export const AdminDashboard = ({ location }: IAdminDashboardProps) => {
    const entityType = location.pathname.split('/')[3];

    return (
        <Layout className="admin-dashboard-page-container">
            <PageHeader
                title="Admin Dashboard"
                subTitle="Lecourt's private space"
                className="admin-dashboard-header"
            />
            <div className="admin-dashboard-content">
                <AdminDashboardContent entityType={entityType} />
            </div>
        </Layout>
    );
};

export default AdminDashboard;
