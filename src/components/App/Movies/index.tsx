import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, PageHeader, List } from 'antd';
import { History } from 'history';

import { IMovieDetails } from '../interfaces';
import './index.css';

export interface IMovies {
    history: History
}

export default (props: IMovies) => {
    const { uploadedMovies } = useSelector((state: any) => ({
        uploadedMovies: state.uploadedMovies,
    }));

    const dispatch = useDispatch();
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
        </Layout>
    );
}
