import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { shallow, ShallowWrapper } from 'enzyme';

import EntityItem from '.';
import { Genre } from '../../../../interfaces';
import styles from './index.module.scss';

describe('EntityItem', () => {
    let wrapper: ShallowWrapper<any>;
    const entity: Genre = { id: 'poney', code: 'magique' };
    const dispatch = jest.fn();

    beforeEach(() => {
        const store = {
            subscribe: jest.fn(),
            dispatch,
            getState: jest.fn(),
            replaceReducer: jest.fn(),
        } as unknown;

        wrapper = shallow(
            <Provider store={store as Store}>
                <EntityItem
                    entity={entity}
                    entityName="persons"
                />
            </Provider>
        );
    });

    test.skip('should render correctly with an item', () => {
        expect(wrapper.find(`.${styles.entityItem}`).length).toBe(1);
    });
});
