import React, { FunctionComponent, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { CREATE_ENTITY, EDIT_ENTITY } from 'reducers/adminDashboard/constants';
import { useDispatch } from 'react-redux';

export interface IBaseFormProps {
    entityItem?: any
    entityName: string
}

const baseFormInitialState = {
    code: '',
};

const BaseForm: FunctionComponent<IBaseFormProps> = ({ entityName, entityItem }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState(baseFormInitialState);

    useEffect(() => {
        setState(entityItem || baseFormInitialState);
    }, [entityItem]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({
            type: entityItem ? EDIT_ENTITY : CREATE_ENTITY,
            payload: {
                entityName,
                body: state,
            },
        });
    };

    const handleCode = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            code: e?.target.value,
        });
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Item
                label="Code du genre (Unique)"
                required
            >
                <Input
                    value={state.code}
                    onChange={handleCode}
                    placeholder="Ex: FRANCE"
                    required
                />
            </Form.Item>
            <Button htmlType="submit">
                Valider
            </Button>
        </Form>
    );
};

export default BaseForm;
