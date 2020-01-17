import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';
import { IMovieFormState } from 'components/App/Movies/components/MovieForm';
import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_DETAILS_SUCCEEDED,
  FETCH_MOVIE_DETAILS_FAILED,
  UPDATE_MOVIE_DETAILS,
  UPDATE_MOVIE_DETAILS_SUCCEEDED,
  UPDATE_MOVIE_DETAILS_FAILED,
} from '../reducers/movieDetails/constants';


function* fetchMovieDetails(action: AnyAction): IterableIterator<Object | void> {
  try {
    const { id } = action.payload;

    const res = yield axios.get(`movies/${id}`);

    if (!res)
      throw new Error('Unable to fetch movie details');

    const { data } = res;

    yield put({
      type: FETCH_MOVIE_DETAILS_SUCCEEDED,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: FETCH_MOVIE_DETAILS_FAILED,
    });
    yield notification['error']({
      message: 'Unable to get details for this short',
      description: e.message,
    });
  }
}

export interface IUpdateMovieDetailsAction {
  type: string
  payload: {
    id: string
    movie: IMovieFormState
  }
}

function* updateMovieDetails(action: IUpdateMovieDetailsAction): IterableIterator<Object | void> {
  try {
    const { id, movie } = action.payload;
    const { posterFile, posterFileList, movieFile, movieFileList, modalVisible, ...n } = movie;

    const res = yield axios.put(`movies/${id}`, {
      ...n,
      duration: 30,
    });

    if (!res)
      throw new Error('Unable to update movie');

    const { data } = res;

    yield put({
      type: UPDATE_MOVIE_DETAILS_SUCCEEDED,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: UPDATE_MOVIE_DETAILS_FAILED,
    });
    yield notification['error']({
      message: 'Unable to update movie',
      description: e.message,
    });
  }
}

function* saga() {
  yield takeEvery(FETCH_MOVIE_DETAILS, fetchMovieDetails);
  yield takeEvery(UPDATE_MOVIE_DETAILS, updateMovieDetails);
}

export default saga;
