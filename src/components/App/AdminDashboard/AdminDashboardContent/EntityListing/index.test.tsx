import React from 'react';
import EntityListing, { IEntityListingProps } from '.';
import { shallow, ShallowWrapper } from 'enzyme';
import { Genre } from '../../../interfaces';
import { ListProps } from 'antd/lib/list';

describe('EntityItem', () => {
    let wrapper: ShallowWrapper<any>;
    const entityList = [{ name: 'poney' }] as unknown;

    beforeEach(() => {
        wrapper = shallow(<EntityListing entityList={entityList as Genre[]} entityName="poney" />)
    });
    test('should render correctle with an item', () => {
        expect(wrapper.find('List').exists()).toBe(true);
    });

    test('should use the entityList as dataSource', () => {
        const props: ListProps<IEntityListingProps> = wrapper.find('List').props();

        expect(props.dataSource).toEqual(entityList);
    });
});