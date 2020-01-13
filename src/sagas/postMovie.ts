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
} from '../reducers/uploadMovie/constants';
import { getUploadUrl } from '../services/requestUrl';
import { IActorForm, directorForm, genreForm, IStaffForm } from 'components/App/interfaces';

export interface IPostMovieAction {
    type: string
    payload: {
        actors: IActorForm[]
        directors: directorForm[]
        genres: genreForm[]
        releaseDate: string
        staff: IStaffForm
        summary: string
        summarySmall: string
        title: string
    }
}

function* postMovie(action: IPostMovieAction): IterableIterator<Object | void> {
    try {
        const {
            actors,
            directors,
            genres,
            releaseDate,
            staff,
            summary,
            summarySmall,
            title,
            ...n
        } = action.payload;

        yield notification['info']({
            message: 'Creating movie in database',
        });

        const res = yield axios.post(`movies`, {
            actors,
            directors,
            duration: 0,
            genres,
            releaseDate,
            staff,
            summary,
            summarySmall,
            title,
        });

        if (!res)
            throw new Error('Unable to create movie');

        const { data }: any = res;

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

        const res = yield axios.post(`${getUploadUrl()}/movies/${id}`, body);
        if (!res)
            throw new Error('Unable to upload the video');

        const { data }: any = res;

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
            message: 'Unable to upload the movie in database',
            description: e.message,
        });
    }
}

function* uploadMoviePosterFile(action: AnyAction): IterableIterator<Object | void> {
    try {
        const {
            id,
            posterFile,
        } = action.payload;

        const body = new FormData();
        body.append('image', posterFile);

        yield notification['info']({
            message: 'Movie successfully created in database',
            description: 'Uploading the video in database',
        });

        const res = yield axios.post(`${getUploadUrl()}/images/${id}`, body);
        if (!res)
            throw new Error('Unable to upload the poster');
    } catch (e) {
        yield notification['error']({
            message: 'Unable to upload the poster in database',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(UPLOAD_MOVIE, postMovie);
    yield takeEvery(UPLOAD_MOVIE_SUCCEEDED, uploadMovieFile);
    yield takeEvery(UPLOAD_MOVIE_SUCCEEDED, uploadMoviePosterFile);
}

export default saga;
