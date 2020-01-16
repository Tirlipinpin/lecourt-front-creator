import { UPLOAD_MOVIE } from '../../../../../reducers/uploadMovie/constants';
import { IMovieFormState } from '../../components/MovieForm';

export const uploadMovie = (payload: IMovieFormState) => ({
    type: UPLOAD_MOVIE,
    payload,
});
