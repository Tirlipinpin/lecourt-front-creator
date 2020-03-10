import { createEntity } from './actions';

describe('The PersonForm action', () => {
    test('shound create a CREATE_ENTITY action', () => {
        const body = { firstName: 'First', lastName: 'Last', birthDate: '2019-01-01' };
    
        expect(createEntity('persons', body)).toStrictEqual({
            type: 'CREATE_ENTITY',
            payload: {
                entityName: 'persons',
                body,
            },
        });
    });
});
