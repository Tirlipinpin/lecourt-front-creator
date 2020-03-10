import React, { FunctionComponent, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { CREATE_ENTITY, EDIT_ENTITY } from 'reducers/adminDashboard/constants';

export interface IGenreFormProps {
    entityName: string
    entityItem: any
}

const personFormInitialState = {
    firstName: '',
    lastName: '',
    birthDate: '1970-01-01',
};

const PersonForm: FunctionComponent<IGenreFormProps> = ({ entityName, entityItem }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState(personFormInitialState);

    useEffect(() => {
        if (entityItem) {
            setState({
                ...personFormInitialState,
                firstName: entityItem.first_name,
                lastName: entityItem.last_name,
            });
        } else {
            setState(personFormInitialState);
        }
    }, [entityItem]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({
            type: entityItem ? EDIT_ENTITY : CREATE_ENTITY,
            payload: {
                entityName,
                body: {
                    id: entityItem?.id,
                    first_name: state.firstName,
                    last_name: state.lastName,
                    birth_date: state.birthDate,
                },
            },
        });
    };
    
    const updateField = (field: string, value: string) => setState({
        ...state,
        [field]: value,
    });

    const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => updateField('firstName', e.target.value);
    const handleLastName = (e: ChangeEvent<HTMLInputElement>) => updateField('lastName', e.target.value);

    return (
        <Form onSubmit={onSubmit}>
            <Form.Item
                label="Prénom"
                required
            >
                <Input
                    value={state.firstName}
                    onChange={handleFirstName}
                    placeholder="Ex: Adèle"
                    required
                />
            </Form.Item>
            <Form.Item
                label="Nom de famille"
                required
            >
                <Input
                    value={state.lastName}
                    onChange={handleLastName}
                    placeholder="Ex: Maleh"
                    required
                />
            </Form.Item>
            <Button htmlType="submit">
                Valider
            </Button>
        </Form>
    );
};

export default PersonForm;
