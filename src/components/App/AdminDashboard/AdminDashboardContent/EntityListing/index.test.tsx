import React from 'react';
import EntityListing, { IEntityListingProps } from '.';
import { mount, ReactWrapper } from 'enzyme';
import * as ReactRedux from 'react-redux';
import { createStore } from 'redux';
import { Genre } from '../../../interfaces';
import { ListProps } from 'antd/lib/list';
import adminDashboardReducer from 'reducers/adminDashboard';

describe('EntityItem', () => {
    let wrapper: ReactWrapper<any>;
    const entityList = [{ name: 'poney' }] as unknown;

    beforeEach(() => {
        jest.spyOn(ReactRedux, 'useSelector').mockImplementation(() => ({
            entityFormVisible: false,
        }));
        const store = createStore(adminDashboardReducer);
        wrapper = mount(
            <ReactRedux.Provider store={store}>
                <EntityListing entityList={entityList as Genre[]} entityName="poney" />
            </ReactRedux.Provider>
        );
    });

    test('should render correctly with an item', () => {
        const List = wrapper.find('List');

        expect(List.exists()).toBe(true);
    });

    test('should use the entityList as dataSource', () => {
        const props: ListProps<IEntityListingProps> = wrapper.find('List').props();

        expect(props.dataSource).toEqual(entityList);
    });
});