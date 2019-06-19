import React, { FormEvent, SyntheticEvent, useState } from 'react';
import {
    Layout,
    PageHeader,
    Form,
    Input,
    Tooltip,
    Icon,
    Upload,
    message,
    Button,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

import './index.css';

export interface IUploadState {
    title: string
    description: string
    movieFile: UploadFile | null,
    posterFile: UploadFile | null,
}

export default () => {
    const [ state, updateState ] = useState({ title: '', description: '', movieFile: null, posterFile: null } as IUploadState);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { title, movieFile, posterFile } = state;
        console.log(title, movieFile, posterFile);

        if (!title || !movieFile || !posterFile) return;

    };

    const handleTitle = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        updateState(prevState => ({ ...prevState, title: target.value }));
    };

    const handleDescription = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        updateState(prevState => ({ ...prevState, description: target.value }));
    }

    const onUploadMovie = (info: UploadChangeParam) => {
        const { file } = info;

        if (file.type === 'video/mp4') {
            message.success(`${file.name} file uploaded successfully.`);
            updateState(prevState => ({ ...prevState, movieFile: file }));
        }
        else {
            message.error(`${file.name} file upload failed.`);
        }
    };

    const onUploadPoster = (info: UploadChangeParam) => {
        const { file } = info;

        if (file && file['type'].split('/')[0] === 'image') {
            message.success(`${file.name} file uploaded successfully.`);
            updateState(prevState => ({ ...prevState, posterFile: file }));
        }
        else {
            message.error(`${file.name} file upload failed.`);
        }
    };

    const { title } = state;
    return (
        <Layout className="upload-page-container">
            <PageHeader
                title="Upload"
                subTitle="Postez vos courts métrages sur la plateforme !"
                className="upload-page-header"
            />
            <div className="upload-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        <Input
                            value={title}
                            onChange={handleTitle}
                            placeholder="Titre du court métrage"
                            suffix={
                                <Tooltip title="Ex: Vive les mouettes">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            required
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                          value={title}
                          onChange={handleDescription}
                          placeholder="Description du court métrage"
                          suffix={
                              <Tooltip title="Ex: Un jeune homme courageux s'en va affronter le monde des mouettes">
                                  <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                              </Tooltip>
                          }
                          required
                        />
                    </Form.Item>
                    <Form.Item required>
                        <Upload.Dragger
                            name="file"
                            onChange={onUploadPoster}
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
                            onChange={onUploadMovie}
                            beforeUpload={() => false}
                        >
                            <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Ajoutez votre court métrage</p>
                            <p className="ant-upload-hint">Celui-ci doit-être au format mp4</p>
                        </Upload.Dragger>
                    </Form.Item>
                    <Button
                        icon="upload"
                        htmlType="submit"
                        className="upload-movie-button"
                    >
                        Envoyer
                    </Button>
                </Form>
            </div>
        </Layout>
    );
}