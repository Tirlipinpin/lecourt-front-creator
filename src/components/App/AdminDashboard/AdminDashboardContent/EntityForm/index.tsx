import React, { FunctionComponent } from 'react';
import BaseForm from './Base';
import { Modal } from 'antd';
import PersonForm from './Person';
import { useSelector, shallowEqual } from 'react-redux';

export interface IEntityFormProps {
    entityName: string
    onCancel: () => void
}

const EntityForm: FunctionComponent<IEntityFormProps> = ({ entityName, onCancel }) => {
    const { entityFormEditing, entityFormVisible } = useSelector((state: any) => ({
        entityFormVisible: state.adminDashboard.entityFormVisible,
        entityFormEditing: state.adminDashboard.entityFormEditing,
    }), shallowEqual);
    
    const renderForm = () => {
        switch (entityName) {
            case 'persons':
                return <PersonForm entityName={entityName} entityItem={entityFormEditing} />;
            default:
                return <BaseForm entityName={entityName} entityItem={entityFormEditing} />;
        }
    };

    return (
        <Modal visible={entityFormVisible} onCancel={onCancel} footer={null}>
            {renderForm()}
        </Modal>
    );
};

export default EntityForm;
