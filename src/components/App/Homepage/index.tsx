import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import './index.css';

export class Homepage extends Component<{}, {}> {
    render() {
        return (
            <Layout className="homepage-page-container">
                Creator Homepage
            </Layout>
        );
    }
};

export default connect()(Homepage);
