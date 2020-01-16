import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Modal } from 'antd';
import MovieForm, { IMovieFormState } from '../../components/MovieForm';
import { fetchMovieCreationData } from '../../components/MovieForm/actions';
import { uploadMovie } from './actions';

export interface IUploadMovieProps {
    onCancel: () => void
    visible: boolean
}

export const UploadMovie: FunctionComponent<IUploadMovieProps> = props => {
    const dispatch = useDispatch();
    const { onCancel, visible } = props;

    const { genres, loading, persons } = useSelector((state: any) => ({
        genres: state.uploadMovie.genres,
        loading: state.uploadMovie.loading,
        persons: state.uploadMovie.persons,
    }), shallowEqual);

    useEffect(() => {
        if (visible)
            dispatch(fetchMovieCreationData());
    }, [dispatch, visible]);

    const onSubmit = (movie: IMovieFormState) => {
        dispatch(uploadMovie(movie));
    };

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            title="Postez un court métrage !"
            footer={null}
            centered
        >
            <MovieForm genres={genres} loading={loading} onSubmit={onSubmit} persons={persons} />
        </Modal>
    );
};

export default UploadMovie;
