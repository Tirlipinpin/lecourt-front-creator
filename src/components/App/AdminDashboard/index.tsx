import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, PageHeader } from 'antd';

import './index.css';

export const AdminDashboard = () => {
    const dispatch = useDispatch();

    return (
        <Layout className="admin-dashboard-page-container">
            <PageHeader
                title="Admin Dashboard"
                subTitle="Lecourt's private space"
                className="admin-dashboard-header"
            />
            <div className="admin-dashboard-content">

            </div>
        </Layout>
    );
};

export default AdminDashboard;
