import React, { PureComponent } from 'react';
import { Layout, PageHeader, List, Icon } from 'antd';

import './index.css';

export interface IMovieDetails {
    title: string
    genre: string[]
    content: string
    src: string,
};

export default class Campaign extends PureComponent<{}, {}> {
    mockData: IMovieDetails[] = [
        {
            title: 'Braddock America',
            genre: ['Drame', 'Comédie'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/934d7f71-04db-4888-a48c-f72f4092d908/images/29686005-abbb-442f-b217-b4b655931298',
        },
        {
            title: 'Avant-Poste',
            genre: ['Horror', 'Drame'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/f6c55551-c5db-4685-857a-f610b8b7cc3e/images/4af06b7f-1cfb-4814-b22a-fdaf4a629e85'
        },
        {
            title: 'Braddock America',
            genre: ['Drame', 'Comédie'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/934d7f71-04db-4888-a48c-f72f4092d908/images/29686005-abbb-442f-b217-b4b655931298',
        },
        {
            title: 'Avant-Poste',
            genre: ['Horror', 'Drame'],
            content: 'quis, iaculis ut odio. Duis pulvinar eleifend nisl ac ultricies. Donec ut aliquam quam. Mauris luctus nec justo vitae mattis. Nam luctus lorem enim. Curabitur eget eros risus. Etiam quis sapien laoreet, varius augue rhoncus, volutpat lorem. Aenean egestas volutpat dignissim. Fusce eget ullamcorper ipsum. In hac habitasse platea dictumst. Ut sed efficitur quam. Fusce tempus odio eu magna tristique, ac iaculis tortor aliquam. Nullam leo dolor, tempus et tincidunt vel, commodo quis nisi. Curabitur pretium sem sit amet rutrum fringilla. Duis diam odio, convallis at augue scelerisque, tristique faucibus orci. Cras ultricies, ante eget sodales tincidunt, eros ante tristique arcu, ac luctus magna sem id mauris. Morbi ut magna erat. Nulla pulvinar',
            src: 'https://management.stg.lecourt.tv/movies/f6c55551-c5db-4685-857a-f610b8b7cc3e/images/4af06b7f-1cfb-4814-b22a-fdaf4a629e85'
        },
    ];

    IconText = ({ type, text }: { type: string, text: string }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
      );

    render() {
        return (
            <Layout className="campaign-page-container">
            <PageHeader title="Campagne de diffusion" subTitle="Définissez les dates de diffusion de vos courts métrages et ajustez les paramètres" />
                <List
                    className="campaign-list"
                    itemLayout="vertical"
                    size="large"
                    dataSource={this.mockData}
                    renderItem={(item: IMovieDetails) => (
                        <List.Item
                          key={item.title}
                          actions={[<this.IconText type="delete" text="Suppression" />, <this.IconText type="info-circle" text="Détails" />, <this.IconText type="setting" text="Gérer la campagne" />]}
                          extra={<img width={272} alt="logo" src={item.src} />}
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
