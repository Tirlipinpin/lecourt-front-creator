import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import {
    UPLOAD_MOVIE,
    UPLOAD_MOVIE_FAILED,
    UPLOAD_MOVIE_SUCCEEDED,
    UPLOAD_MOVIE_FILE_FAILED,
    UPLOAD_MOVIE_FILE_SUCCEEDED,
    FETCH_PERSONS,
    FETCH_PERSONS_SUCCEEDED,
    FETCH_PERSONS_FAILED,
} from '../reducers/uploadMovie/constantes';

function* fetchPersons(): IterableIterator<Object | void> {
    try {
        const res = yield axios.get(`persons`);

        if (!res)
            throw new Error('Unable to fetch persons to add to your short');

        const { data } = res;

        yield put({
            type: FETCH_PERSONS_SUCCEEDED,
            payload: {
                data,
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_PERSONS_FAILED,
        });
        yield notification['error']({
            message: 'Unable to fetch persons to add to your short',
            description: e.message,
        });
    }
}

function* postMovie(action: AnyAction): IterableIterator<Object | void> {
    try {
        const {
            title,
            summary,
            summarySmall,
            releaseDate,
            ...n
        } = action.payload;

        yield notification['info']({
            message: 'Creating movie in database',
        });

        const res = yield axios.post(`movies`, {
            title,
            summary,
            summarySmall,
            releaseDate,
            duration: 0,
        });

        if (!res)
            throw new Error('Unable to create movie');

        const { data } = res;

        yield put({
            type: UPLOAD_MOVIE_SUCCEEDED,
            payload: {
                ...data,
                ...n,
            },
        });
    } catch (e) {
        yield put({
            type: UPLOAD_MOVIE_FAILED,
        });
        yield notification['error']({
            message: 'Unable to create movie in database',
            description: e.message,
        });
    }
}

function* uploadMovieFile(action: AnyAction): IterableIterator<Object | void> {
    try {
        const {
            id,
            movieFile,
        } = action.payload;

        const body = new FormData();
        body.append('movie', movieFile);

        yield notification['info']({
            message: 'Movie successfully created in database',
            description: 'Uploading the video in database',
        });

        const res = yield axios.post(`https://upload.stg.lecourt.tv/movies/${id}`, body);
        if (!res)
            throw new Error('Unable to upload the video');

        const { data } = res;

        yield put({
            type: UPLOAD_MOVIE_FILE_SUCCEEDED,
            payload: {
                ...data,
            },
        });
    } catch (e) {
        yield put({
            type: UPLOAD_MOVIE_FILE_FAILED,
        });
        yield notification['error']({
            message: 'Unable to upload movie in database',
            description: e.message,
        });
    }
}

function* addMovieActors(action: AnyAction): IterableIterator<Object | void> {
    try {
        const {
            id,
            actors,
        } = action.payload;

        const res = yield axios.post(`movies/${id}/actors`, actors);

        if (!res)
            throw new Error('Unable to add actors');

    } catch (e) {
        yield notification['error']({
            message: 'Unable to add actors in database',
            description: e.message,
        });
    }
}

function* addMovieDirectors(action: AnyAction): IterableIterator<Object | void> {
    try {
        const {
            id,
            directors,
        } = action.payload;

        const res = yield axios.post(`movies/${id}/directors`, directors);
        if (!res)
            throw new Error('Unable to add directors');

        const { data } = res;

        yield put({
            type: UPLOAD_MOVIE_FILE_SUCCEEDED,
            payload: {
                ...data,
            },
        });
    } catch (e) {
        yield put({
            type: UPLOAD_MOVIE_FILE_FAILED,
        });
        yield notification['error']({
            message: 'Unable to add directors in database',
            description: e.message,
        });
    }
}

function* addMovieStaff(action: AnyAction): IterableIterator<Object | void> {
    try {
        const {
            id,
            staff,
        } = action.payload;

        const res = yield axios.post(`movies/${id}/staff`, staff);
        if (!res)
            throw new Error('Unable to add staff');

    } catch (e) {
        yield notification['error']({
            message: 'Unable to add staff in database',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(FETCH_PERSONS, fetchPersons);
    yield takeEvery(UPLOAD_MOVIE, postMovie);
    yield takeEvery(UPLOAD_MOVIE_SUCCEEDED, uploadMovieFile);
    yield takeEvery(UPLOAD_MOVIE_SUCCEEDED, addMovieActors);
    yield takeEvery(UPLOAD_MOVIE_SUCCEEDED, addMovieDirectors);
    yield takeEvery(UPLOAD_MOVIE_SUCCEEDED, addMovieStaff);
}

export default saga;
