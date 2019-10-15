import React from 'react';
import { List } from 'antd';
import {
    Person,
    Genre,
    Country,
} from '../../interfaces';
import EntityItem from './EntityItem';

export interface IEntityListingProps {
    entityList: (Person | Genre | Country)[]
    entityName: string
};

export const EntityListing = ({ entityList, entityName }: IEntityListingProps) => {
    return (
        <List
            header={entityName}
        >
            {
                entityList.map((entity: Person | Genre | Country) => (
                    <EntityItem entity={entity} />
                ))
            }
        </List>
    );
}

export default EntityListing;