import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PersonsSelect from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The PersonsSelect component', () => {
    let wrapper: ShallowWrapper<any>;

    beforeEach(() => {
        wrapper = shallow(
          <PersonsSelect
              persons={[]}
              onSelect={jest.fn()}
              onDeselect={jest.fn()}
              filterOptions={jest.fn()}
          />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});
