import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RoleSelect from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('The RoleSelect component', () => {
    let wrapper: ShallowWrapper<any>;

    beforeEach(() => {
        wrapper = shallow(
          <RoleSelect
            id="42"
            visible={true}
            handleHideModal={jest.fn()}
            addPerson={jest.fn()}
          />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});
