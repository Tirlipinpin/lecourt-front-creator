import React, {FormEvent, SyntheticEvent, useState} from 'react';
import {
    Button,
    Form,
    Input,
    Modal
} from 'antd';

export interface IRoleSelectProps {
    id: string
    visible: boolean
    handleHideModal: () => void
    addPerson?: (id: string, role: string) => void
}

export default ({ id, visible, handleHideModal, addPerson }: IRoleSelectProps) => {
    const [role, updateRole] = useState('');

    const handleRole = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        updateRole(target.value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (addPerson) {
            addPerson(id, role);
            updateRole('');
            handleHideModal();
        }
    };

    return (
      <Modal
        visible={visible}
        onCancel={handleHideModal}
        footer={false}
      >
          <Form onSubmit={onSubmit}>
              <Form.Item
                label="Ajoutez un rôle à la personne"
                required
              >
                  <Input
                    value={role}
                    onChange={handleRole}
                    placeholder="Ex: Caméraman, Producteur, Edouard"
                    required
                  />
              </Form.Item>
              <Button
                icon="plus"
                htmlType="submit"
              >
                  Accepter
              </Button>
          </Form>
      </Modal>
    );
}