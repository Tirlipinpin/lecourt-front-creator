import React from 'react';
import * as ReactRedux from 'react-redux';
import { mount, ReactWrapper } from 'enzyme';
import BaseForm from '.';

describe('The EntityForm Base component', () => {
    let wrapper: ReactWrapper<any>;
    let dispatch: jest.Mock;

    beforeEach(() => {
        dispatch = jest.fn();
        jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);
        wrapper = mount(<BaseForm entityName="genres" entityItem={null} />);
    });

    test('should render correctly with a Form', () => {
        expect(wrapper.find('Form').exists()).toBe(true);
    });

    test('should dispatch a create action on submit', () => {
        const form = wrapper.find('Form');
        const codeInput = wrapper.find('Input');
        codeInput.simulate('change', {
            target: {
                value: 'FRA',
            },
        });

        form.simulate('submit', { preventDefault: jest.fn() });

        expect(dispatch).toHaveBeenCalledWith({
            type: 'CREATE_ENTITY',
            payload: {
                entityName: 'genres',
                body: {
                    code: 'FRA',
                },
            },
        });
    });
});
