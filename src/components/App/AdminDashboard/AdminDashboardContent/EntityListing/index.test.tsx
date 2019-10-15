import React from 'react';
import EntityListing from '.';
import { shallow, ShallowWrapper } from 'enzyme';
import { Genre } from '../../../interfaces';

describe('EntityItem', () => {
    let wrapper: ShallowWrapper<any>;
    const entityList = [{ name: 'poney' }] as unknown;

    beforeEach(() => {
        wrapper = shallow(<EntityListing entityList={entityList as Genre[]} entityName="poney" />)
    });
    test('should render correctle with an item', () => {
        expect(wrapper.find('List').exists()).toBe(true);
    });

    test('should only have one child to list', () => {
        expect(wrapper.find('List').children()).toHaveLength(1);
    });
});