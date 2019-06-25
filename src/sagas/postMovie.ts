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
} from '../reducers/uploadMovie/constantes';

function* postMovie(action: AnyAction): IterableIterator<Object | void> {
    try {
        const {
            title,
            description,
            shortDescription,
            posterFile,
            movieFile,
        } = action.payload;

        yield notification['info']({
            message: 'Creating movie in database',
        });

        const res = yield axios.post(`movies`, {
            title,
            summary: description,
            shortSummary: shortDescription,
        });

        if (!res)
            throw new Error('Unable to create movie');

        const { data } = res;

        yield put({
            type: UPLOAD_MOVIE_SUCCEEDED,
            payload: {
                ...data,
                posterFile,
                movieFile,
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
            data: createMovieData,
            posterFile,
            movieFile,
        } = action.payload;

        yield notification['info']({
            message: 'Movie successfully created in database',
            description: 'Uploading the video in database',
        });

        const res = yield axios.post(`movies/video`, {
            id: createMovieData.id,
            movieFile,
        });

        if (!res)
            throw new Error('Unable to upload the video');

        const { data } = res;

        yield put({
            type: UPLOAD_MOVIE_FILE_SUCCEEDED,
            payload: {
                ...data,
                posterFile,
                movieFile,
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

function* saga() {
    yield takeEvery(UPLOAD_MOVIE, postMovie);
    yield takeEvery(UPLOAD_MOVIE_SUCCEEDED, uploadMovieFile);
}

export default saga;
