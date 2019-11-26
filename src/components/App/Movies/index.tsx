import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Layout, PageHeader, List, Modal, Button, Tooltip} from 'antd';
import { History } from 'history';

import { IMovieDetails } from '../interfaces';
import { SHOW_UPLOAD_MOVIE_MODAL, HIDE_UPLOAD_MOVIE_MODAL } from '../../../reducers/uploadMovie/constants';
import './index.css';
import UploadMovie from "./UploadMovie";

export interface IMovies {
    history: History
}

export default (props: IMovies) => {
    const dispatch = useDispatch();
    const { uploadedMovies, uploadModalVisible } = useSelector((state: any) => ({
        uploadedMovies: state.uploadedMovies,
        uploadModalVisible: state.uploadMovie.visible,
    }));

    const showUploadModal = () => {
        dispatch({ type: SHOW_UPLOAD_MOVIE_MODAL });
    };

    const hideUploadModal = () => {
        dispatch({ type: HIDE_UPLOAD_MOVIE_MODAL });
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_UPLOADED_MOVIES' });
    }, []);

    const goToMovieDetails = (id: string) => {
        const { history } = props;

        history.push(`/app/movies/${id}`);
    };

    return (
        <Layout className="movies-page-container">
        <PageHeader
          title="Films"
          subTitle="Explorez vos courts métrages postés sur la platforme et définissez leurs paramètres"
          className="movies-page-header"
        />
            <List
                className="movies-list"
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 5,
                }}
                dataSource={uploadedMovies.movies}
                renderItem={(item: IMovieDetails) => (
                    <List.Item
                      onClick={() => goToMovieDetails(item.id)}
                      key={item.title}
                      extra={<img width={140} alt="logo" src={item.images[0] && item.images[0].node.id} />}
                      className="movies-list-item"
                    >
                     <List.Item.Meta
                        title={item.title}
                        description={item.genres.map(genre => genre.node.name).join(', ')}
                    />
                    {item.summary}
                    </List.Item>
                  )}
            />
            <Modal
              visible={uploadModalVisible}
              onCancel={hideUploadModal}
              title="Postez un court métrage !"
              footer={null}
            >
                <UploadMovie />
            </Modal>
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
