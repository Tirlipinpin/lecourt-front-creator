import React, { FunctionComponent, Fragment } from 'react';
import { List, Tooltip, Button } from 'antd';
import {
    Person,
    Genre,
    Country,
} from '../../../interfaces';
import EntityItem from './EntityItem';
import EntityForm from '../EntityForm';
import { SET_EDIT_ENTITY } from 'reducers/adminDashboard/constants';
import {useDispatch, useSelector, shallowEqual } from 'react-redux';

export interface IEntityListingProps {
    entityList: (Person | Genre | Country)[]
    entityName: string
};

export const EntityListing: FunctionComponent<IEntityListingProps> = ({ entityList, entityName }) => {
    const dispatch = useDispatch();

    const showEntityForm = (item: any = null) => dispatch({
        type: SET_EDIT_ENTITY,
        payload: item,
    });

    const hideEntityForm = () => dispatch({
        type: SET_EDIT_ENTITY,
        payload: null,
    });

    return (
        <Fragment>
            <List
                header={<h1>{entityName}</h1>}
                pagination={{
                    pageSize: 10,
                }}
                dataSource={entityList}
                renderItem={(entity: Person | Genre | Country) => (
                    <EntityItem key={entity.id} entity={entity} entityName={entityName} onEdit={showEntityForm} />
                )}
            />
            <EntityForm entityName={entityName} onCancel={hideEntityForm} />
            <Tooltip
                placement="left"
                title="Créer"
            >
                <Button
                    type="primary"
                    shape="circle"
                    icon="plus"
                    className="add-movie-button floating-button"
                    size="large"
                    onClick={showEntityForm}
                />
            </Tooltip>
        </Fragment>
    );
};

export default EntityListing;