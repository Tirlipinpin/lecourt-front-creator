import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Skeleton, Card, Avatar, Anchor } from 'antd';
import MediaQuery from 'react-responsive';

import './index.css';

export class Profile extends Component<{}, {}> {
    private cardStyle = {
        marginTop: 86,
        marginLeft: 36,
        marginRight: 36,
    };

    private cardBodyStyle = {
        minHeight: 300,
    };

    render() {
        return (
            <Layout className="profile-page-container">
                <Layout.Content className="profile-page-content">
                    <div className="profile-page-header">
                        <Avatar size={128} icon="user" className="user-profile-picture" />
                        <h1>John Doe</h1>
                    </div>
                    <Layout>
                        <MediaQuery minDeviceWidth={720}>
                            <Layout.Sider className="anchor-menu" theme="light">
                                <Anchor className="anchor" offsetTop={86} bounds={64}>
                                    <h2 className="anchor-title">Go to</h2>
                                    <Anchor.Link href="#profile-update" title="Profile update" />
                                    <Anchor.Link href="#favorites" title="Favorites" />
                                    <Anchor.Link href="#global-preferences" title="Global preferences" />
                                    <Anchor.Link href="#privacy-settings" title="Privacy settings" />
                                </Anchor>
                            </Layout.Sider>
                        </MediaQuery>
                        <Layout.Content className="cards-parameters-container">
                            <Card
                                className="card-parameters"
                                title="Profile update"
                                style={this.cardStyle}
                                bodyStyle={this.cardBodyStyle}
                                id="profile-update"
                            ><Skeleton active paragraph={{ rows: 8 }} /></Card>
                            <Card
                                className="card-parameters"
                                title="Favorites"
                                style={this.cardStyle}
                                bodyStyle={this.cardBodyStyle}
                                id="favorites"
                            ><Skeleton active paragraph={{ rows: 3 }} /></Card>
                            <Card
                                className="card-parameters"
                                title="Global preferences"
                                style={this.cardStyle}
                                bodyStyle={this.cardBodyStyle}
                                id="global-preferences"
                            ><Skeleton active paragraph={{ rows: 8 }} /></Card>
                            <Card
                                className="card-parameters"
                                title="Privacy settings"
                                style={this.cardStyle}
                                bodyStyle={this.cardBodyStyle}
                                id="privacy-settings"
                            ><Skeleton active paragraph={{ rows: 5 }} /></Card>
                        </Layout.Content>
                    </Layout>
                </Layout.Content>
            </Layout>
        );
    }
}

export default connect()(Profile);
