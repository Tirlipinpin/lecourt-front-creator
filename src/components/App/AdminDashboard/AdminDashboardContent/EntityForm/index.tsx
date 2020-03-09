import React, { FunctionComponent } from 'react';
import BaseForm from './Base';
import { Modal } from 'antd';
import PersonForm from './Person';

export interface IEntityFormProps {
    entityItem: any
    entityName: string
    onCancel: () => void
    visible: boolean
}

const EntityForm: FunctionComponent<IEntityFormProps> = ({ entityItem, entityName, visible, onCancel }) => {
    const renderForm = () => {
        switch (entityName) {
            case 'persons':
                return <PersonForm entityName={entityName} entityItem={entityItem} />;
            default:
                return <BaseForm entityName={entityName} entityItem={entityItem} />;
        }
    };

    return (
        <Modal visible={visible} onCancel={onCancel} footer={null}>
            {renderForm()}
        </Modal>
    );
};

export default EntityForm;
