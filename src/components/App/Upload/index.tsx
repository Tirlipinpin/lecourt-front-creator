import React, { Component } from 'react';
import { PageHeader } from 'antd';

export default class Upload extends Component<{}, {}> {
    render() {
        return (
            <PageHeader
                title="Upload"
                subtitle="Postez vos courts métrages sur la plateforme !"
            />
        );
    }
}