import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Spin } from 'antd';
import {
    fetchPersons, fetchGenres, fetchCountries,
} from './actions';
import EntityListing from './EntityListing';

export interface IAdminDashboardContentProps {
    entityType: string
};

export const AdminDashboardContent = ({ entityType }: IAdminDashboardContentProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        switch (entityType) {
            case 'persons':
                dispatch(fetchPersons());
                return;
            case 'genres':
                dispatch(fetchGenres());
                return;
            case 'countries':
                dispatch(fetchCountries());
                return;
            default:
                return;
        }
    }, [dispatch, entityType]);

    const adminDashboard = useSelector((state: any) => state.adminDashboard );
    const { list, loading } = adminDashboard;

    if (loading) return <Spin indicator={<Icon type="loading" />} />;
    return (
        <Fragment>
            <EntityListing entityList={list} entityName={entityType} />
        </Fragment>
    );
};

export default AdminDashboardContent;