import React from 'react';
import EntityItem from '.';
import { shallow, ShallowWrapper } from 'enzyme';
import { Genre } from '../../../../interfaces';

describe('EntityItem', () => {
    let wrapper: ShallowWrapper<any>;
    const entity = { name: 'poney' } as unknown;

    beforeEach(() => {
        wrapper = shallow(<EntityItem entity={entity as Genre} />)
    });
    test('should render correctle with an item', () => {
        expect(wrapper.find('Item').exists()).toBe(true);
    });
});