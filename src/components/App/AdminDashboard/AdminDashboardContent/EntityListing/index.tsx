import React, { FunctionComponent } from 'react';
import { List } from 'antd';
import {
    Person,
    Genre,
    Country,
} from '../../../interfaces';
import EntityItem from './EntityItem';

export interface IEntityListingProps {
    entityList: (Person | Genre | Country)[]
    entityName: string
};

export const EntityListing: FunctionComponent<IEntityListingProps> = ({ entityList, entityName }) => (
    <List
        header={<h1>{entityName}</h1>}
        pagination={{
            pageSize: 10,
        }}
        dataSource={entityList}
        renderItem={(entity: Person | Genre | Country) => (
          <EntityItem key={entity.id} entity={entity} entityName={entityName} />
      )}
    />
);

export default EntityListing;