import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { fetchMovieDetails, updateMovieDetails } from './actions';
import MovieForm, { IMovieFormState } from '../../components/MovieForm';
import { fetchMovieCreationData } from '../../components/MovieForm/actions';

export interface IMovieUpdateProps {
    id: string
    onCancel: () => void
    visible: boolean
}

export const MovieUpdate: FunctionComponent<IMovieUpdateProps> = props => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { id, onCancel, visible } = props;

    useEffect(() => {
        if (visible) {
            dispatch(fetchMovieCreationData());
            dispatch(fetchMovieDetails(id));
        }
    }, [dispatch, id, visible]);

    const {
        genres,
        loadingMovieDetails,
        loadingMovieCreationData,
        movie,
        persons,
        updatingMovie,
    } = useSelector((state: any) => ({
        genres: state.uploadMovie.persons,
        loadingMovieCreationData: state.uploadMovie.loading,
        loadingMovieDetails: state.movieDetails.loading,
        movie: state.movieDetails.movie,
        persons: state.uploadMovie.persons,
        updatingMovie: state.movieDetails.updatingMovie,
    }), shallowEqual);

    const submitMovieUpdate = (movie: IMovieFormState) => {
        dispatch(updateMovieDetails(movie));
    };

    return (
        <Modal
            centered
            footer={null}
            onCancel={onCancel}
            visible={visible}
            title={t('UPDATE_YOUR_SHORT')}
        >
            <MovieForm disabled={updatingMovie} genres={genres} loading={loadingMovieDetails || loadingMovieCreationData} movie={movie} onSubmit={submitMovieUpdate} persons={persons} />
        </Modal>
    );
};

export default MovieUpdate;
