import React, { PureComponent } from 'react';
import { Layout, PageHeader, List, Icon } from 'antd';
import { History } from 'history';

import './index.css';

export interface IMovieInfo {
    title: string
    genre: string[]
    content: string
    src: string
    id: number
}

export interface IMovies {
    history: History
}

export default class Movies extends PureComponent<IMovies, {}> {
    mockData: IMovieInfo[] = [
        {
            title: 'Braddock America',
            genre: ['Drame', 'Comédie'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/934d7f71-04db-4888-a48c-f72f4092d908/images/29686005-abbb-442f-b217-b4b655931298',
            id: 1
        },
        {
            title: 'Avant-Poste',
            genre: ['Horror', 'Drame'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/f6c55551-c5db-4685-857a-f610b8b7cc3e/images/4af06b7f-1cfb-4814-b22a-fdaf4a629e85',
            id: 2
        },
        {
            title: 'Braddock America',
            genre: ['Drame', 'Comédie'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/934d7f71-04db-4888-a48c-f72f4092d908/images/29686005-abbb-442f-b217-b4b655931298',
            id: 3
        },
        {
            title: 'Avant-Poste',
            genre: ['Horror', 'Drame'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/f6c55551-c5db-4685-857a-f610b8b7cc3e/images/4af06b7f-1cfb-4814-b22a-fdaf4a629e85',
            id: 4
        },
        {
            title: 'Braddock America',
            genre: ['Drame', 'Comédie'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/934d7f71-04db-4888-a48c-f72f4092d908/images/29686005-abbb-442f-b217-b4b655931298',
            id: 5
        },
        {
            title: 'Avant-Poste',
            genre: ['Horror', 'Drame'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/f6c55551-c5db-4685-857a-f610b8b7cc3e/images/4af06b7f-1cfb-4814-b22a-fdaf4a629e85',
            id: 6
        },
        {
            title: 'Braddock America',
            genre: ['Drame', 'Comédie'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/934d7f71-04db-4888-a48c-f72f4092d908/images/29686005-abbb-442f-b217-b4b655931298',
            id: 7
        },
        {
            title: 'Avant-Poste',
            genre: ['Horror', 'Drame'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/f6c55551-c5db-4685-857a-f610b8b7cc3e/images/4af06b7f-1cfb-4814-b22a-fdaf4a629e85',
            id: 8
        },
    ];

    IconText = ({ type, text }: { type: string, text: string }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
      );

    goToMovieDetails = (id: number) => {
        const { history } = this.props;

        history.push(`/app/movies/${id}`);
    };

    render() {
        return (
            <Layout className="campaign-page-container">
            <PageHeader title="Films" subTitle="Explorez vos courts métrages postés sur la platforme et définissez leurs paramètres" />
                <List
                    className="campaign-list"
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 5,
                    }}
                    dataSource={this.mockData}
                    renderItem={(item: IMovieInfo) => (
                        <List.Item
                          onClick={() => this.goToMovieDetails(item.id)}
                          key={item.title}
                          extra={<img width={140} alt="logo" src={item.src} />}
                          className="campaign-list-item"
                        >
                         <List.Item.Meta
                            title={item.title}
                            description={item.genre.join(', ')}
                        />
                        {item.content}
                        </List.Item>
                      )}
                />
            </Layout>
        );
    }
}
