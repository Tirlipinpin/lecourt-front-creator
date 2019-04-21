import React, { Component, FormEvent, SyntheticEvent } from 'react';
import {
    Layout,
    PageHeader,
    Form,
    DatePicker,
    Input,
    Tooltip,
    Icon,
    Upload,
    message,
    Button,
} from 'antd';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { UploadChangeParam } from 'antd/lib/upload';

import './index.css';

export interface IUploadState {
    title: string
    startDate: string
    endDate: string
    movie: File | null,
    poster: File | null,
}

export default class UploadMovie extends Component<IUploadState, {}> {
    state: Readonly<IUploadState> = {
        title: '',
        startDate: '',
        endDate: '',
        movie: null,
        poster: null,
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    handleTitle = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        this.setState({ title: target.value });
    }

    handleDateRange = (dates: RangePickerValue, dateStrings: [string, string]) => {
        this.setState({
            startDate: dateStrings[0],
            endDate: dateStrings[1],
        });
    }

    onUploadMovie = (info: UploadChangeParam) => {
        const { status } = info.file;

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            this.setState({ movie: info.file })
        }
        else if (status === 'error')
            message.error(`${info.file.name} file upload failed.`);
    }

    onUploadPoster = (info: UploadChangeParam) => {
        const { status } = info.file;

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            this.setState({ poster: info.file })
        }
        else if (status === 'error')
            message.error(`${info.file.name} file upload failed.`);
    }

    render() {
        const { title } = this.state;

        return (
            <Layout className="upload-page-container">
                <PageHeader
                    title="Upload"
                    subTitle="Postez vos courts métrages sur la plateforme !"
                    className="upload-page-header"
                />
                <div className="upload-form">
                    <Form onSubmit={this.handleSubmit}>
                        <Input
                            prefix={<Icon type="info" />}
                            value={title}
                            onChange={this.handleTitle}
                            placeholder="Titre du court métrage"
                            suffix={
                                <Tooltip title="Email address">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            required
                        />
                        <Form.Item label="Date de diffusion" required>
                            <DatePicker.RangePicker
                                onChange={this.handleDateRange}
                            />
                        </Form.Item>
                        <Form.Item required>
                            <Upload.Dragger
                                name="file"
                                onChange={this.onUploadPoster}
                                beforeUpload={() => false}
                            >
                                <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Ajoutez le poster du court métrage</p>
                                <p className="ant-upload-hint">Celui-ci sera utilisé comme vignette représentative de votre film</p>
                            </Upload.Dragger>
                        </Form.Item>
                        <Form.Item required>
                            <Upload.Dragger
                                name="file"
                                onChange={this.onUploadMovie}
                                beforeUpload={() => false}
                            >
                                <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Ajoutez votre court métrage</p>
                                <p className="ant-upload-hint">Celui-ci doit-être au format mp4</p>
                            </Upload.Dragger>
                        </Form.Item>
                        <Button icon="upload">Envoyer</Button>
                    </Form>
                </div>
            </Layout>
        );
    }
}