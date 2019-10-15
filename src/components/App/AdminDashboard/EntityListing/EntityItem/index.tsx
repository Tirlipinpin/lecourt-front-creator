import React from 'react';
import { List, Icon } from 'antd';
import {
    Person,
    Genre,
    Country,
} from '../../../interfaces';

const { Item } = List;

export interface IEntityItemProps {
    entity: Person | Genre | Country
};

export const getEntityName = (entity: Person | Genre | Country): string => {
    if ('firstName' in entity) return `${entity.firstName} ${entity.lastName}`;

    return entity.name;
}

export const EntityItem = ({ entity }: IEntityItemProps) => {
    const deleteEntity = () => {
        // delete entity
    };

    return (
        <Item>
            {getEntityName(entity)}
            <Icon type="bin" onClick={deleteEntity} />
        </Item>
    );
};

export default EntityItem;