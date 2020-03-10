import React from 'react';
import * as ReactRedux from 'react-redux';
import { mount, ReactWrapper } from 'enzyme';
import PersonForm from '.';

describe('The EntityForm Base component', () => {
    let wrapper: ReactWrapper<any>;
    let dispatch: jest.Mock;

    beforeEach(() => {
        dispatch = jest.fn();
        jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);
        wrapper = mount(<PersonForm entityName="persons" entityItem={null} />);
    });

    test('should render correctly with a Form', () => {
        expect(wrapper.find('Form').exists()).toBe(true);
    });

    test('should dispatch a create action on submit', () => {
        const form = wrapper.find('Form');
        const firstNameInput = wrapper.find('Input').at(0);
        const lastNameInput = wrapper.find('Input').at(1);

        firstNameInput.simulate('change', {
            target: {
                value: 'First',
            },
        });
        lastNameInput.simulate('change', {
            target: {
                value: 'Last',
            },
        });
        form.simulate('submit', { preventDefault: jest.fn() });

        expect(dispatch).toHaveBeenCalledWith({
            type: 'CREATE_ENTITY',
            payload: {
                entityName: 'persons',
                body: {
                    first_name: 'First',
                    last_name: 'Last',
                    birth_date: '1970-01-01',
                },
            },
        });
    });
});
