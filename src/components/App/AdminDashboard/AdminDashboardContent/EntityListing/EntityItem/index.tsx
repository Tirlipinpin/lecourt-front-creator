import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { Button, List, Icon } from 'antd';
import {
    Person,
    Genre,
    Country,
} from '../../../../interfaces';
import { deleteEntity, editEntity } from './actions';
import styles from './index.module.scss';

const { Item } = List;

export interface IEntityItemProps {
    entity: Person | Genre | Country
    entityName: string
    onEdit?: (item: any) => void
};

const getEntityName = (entity: Person | Genre | Country): string => {
    if ('first_name' in entity) return `${entity.first_name} ${entity.last_name}`;

    return entity.code;
};

export const EntityItem: FunctionComponent<IEntityItemProps> = ({ entity, entityName }) => {
    const dispatch = useDispatch();

    return (
        <Item className={styles.entityItem}>
            {getEntityName(entity)}
            <div className={styles.buttons}>
                <Button
                    type="primary"
                    onClick={() => dispatch(editEntity(entity))}
                >
                    <Icon type="edit" />
                </Button>
                <Button
                    type="danger"
                    onClick={() => dispatch(deleteEntity(entity.id, entityName))}
                >
                    <Icon type="delete" />
                </Button>
            </div>
        </Item>
    );
};

export default EntityItem;