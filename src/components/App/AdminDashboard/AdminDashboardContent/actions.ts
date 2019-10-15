import {
    FETCH_PERSONS, FETCH_GENRES, FETCH_COUNTRIES,
} from '../../../../reducers/constants';

export const fetchPersons = () => ({
    type: FETCH_PERSONS,
});

export const fetchGenres = () => ({
    type: FETCH_GENRES,
});

export const fetchCountries = () => ({
    type: FETCH_COUNTRIES,
});
