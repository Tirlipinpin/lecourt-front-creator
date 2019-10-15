import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_DETAILS_SUCCEEDED,
  FETCH_MOVIE_DETAILS_FAILED,
} from '../reducers/movieDetails/constants';


function* fetchMovieDetails(action: AnyAction): IterableIterator<Object | void> {
  try {
    const { id } = action.payload;

    const res = yield axios.get(`movies/${id}`);

    if (!res)
      throw new Error('Unable to fetch movies');

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

function* saga() {
  yield takeEvery(FETCH_MOVIE_DETAILS, fetchMovieDetails);
}

export default saga;
