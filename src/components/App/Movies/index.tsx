import React, { useEffect, FunctionComponent, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {Layout, PageHeader, List, Button, Tooltip, Icon} from 'antd';
import { History } from 'history';
import { IMovieDetails } from '../interfaces';
import { SHOW_UPLOAD_MOVIE_MODAL, HIDE_UPLOAD_MOVIE_MODAL } from '../../../reducers/uploadMovie/constants';
import UploadMovie from './containers/UploadMovie';
import MovieUpdate from './containers/MovieUpdate';
import styles from './index.module.scss';

export interface IMovies {
    history: History
}

export const Movies: FunctionComponent<IMovies> = props => {
    const dispatch = useDispatch();
    const { loading, uploadedMovies, uploadModalVisible } = useSelector((state: any) => ({
        loading: state.uploadedMovies.loading,
        uploadedMovies: state.uploadedMovies.movies,
        uploadModalVisible: state.uploadMovie.visible,
    }), shallowEqual);

    const [isUpdateMovieModalVisible, updateIsUpdateMovieModalVisible] = useState(false);
    const [actualUpdatingMovie, updateActualUpdatingMovie] = useState('');

    const showUploadModal = () => {
        dispatch({ type: SHOW_UPLOAD_MOVIE_MODAL });
    };

    const hideUploadModal = () => {
        dispatch({ type: HIDE_UPLOAD_MOVIE_MODAL });
    };

    const showUpdateMovieModal = (id: string) => {
        updateIsUpdateMovieModalVisible(true);
        updateActualUpdatingMovie(id);
    };

    const hideUpdateMovieModal = () => updateIsUpdateMovieModalVisible(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_UPLOADED_MOVIES' });
    }, [dispatch]);

    return (
        <Layout className={styles.moviePageContainer}>
        <PageHeader
            title="Films"
            subTitle="Explorez vos courts métrages postés sur la platforme et définissez leurs paramètres"
            className={styles.moviePageHeader}
        />
            <List
                className={styles.moviesList}
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 5,
                    className: styles.pagination
                }}
                dataSource={uploadedMovies}
                loading={loading}
                renderItem={(item: IMovieDetails) => (
                    <List.Item
                      key={item.title}
                      extra={<img width={140} alt="logo" src={item.posters[0] && item.posters[0].file.id} />}
                      className={styles.moviesListItem}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.genres.map(genre => genre.genre.code).join(', ')}
                            avatar={<Button shape="circle" onClick={() => showUpdateMovieModal(item.id)}><Icon type="edit" /></Button>}
                        />
                        {item.summary}
                    </List.Item>
                  )}
            />
            <UploadMovie onCancel={hideUploadModal} visible={uploadModalVisible} />
            <MovieUpdate id={actualUpdatingMovie} onCancel={hideUpdateMovieModal} visible={isUpdateMovieModalVisible} />
            <Tooltip
              placement="left"
              title="Postez un film"
            >
                <Button
                  type="primary"
                  shape="circle"
                  icon="plus"
                  className="add-movie-button floating-button"
                  size="large"
                  onClick={showUploadModal}
                />
            </Tooltip>
        </Layout>
    );
};

export default Movies;
