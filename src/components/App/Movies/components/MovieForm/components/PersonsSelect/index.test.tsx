import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import PersonsSelect from '.';

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

    test('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});
