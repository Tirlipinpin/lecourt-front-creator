import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow, ShallowWrapper } from 'enzyme';
import BaseForm from '.';

describe('The EntityForm Base component', () => {
    let wrapper: ShallowWrapper<any>;
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
        jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);
        wrapper = shallow(<BaseForm entityName="persons" entityItem={null} />);
    });

    test('should render correctly with a Form', () => {
        expect(wrapper.find('Form').exists()).toBe(true);
    });
});
