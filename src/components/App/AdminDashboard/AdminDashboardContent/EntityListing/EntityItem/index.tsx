import React from 'react';
import { Button, List, Icon } from 'antd';
import {
    Person,
    Genre,
    Country,
} from '../../../../interfaces';
import './index.css';

const { Item } = List;

export interface IEntityItemProps {
    entity: Person | Genre | Country
};

const getEntityName = (entity: Person | Genre | Country): string => {
    if ('firstName' in entity) return `${entity.firstName} ${entity.lastName}`;

    return entity.name;
}

export const EntityItem = ({ entity }: IEntityItemProps) => {
    const deleteEntity = () => {
        // delete entity
    };

    return (
        <Item className="entity-item">
            {getEntityName(entity)}
            <Button type="danger"><Icon type="delete" onClick={deleteEntity} /></Button>
        </Item>
    );
};

export default EntityItem;