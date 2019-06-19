import React, { FormEvent, SyntheticEvent, Component } from 'react';
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
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './index.css';
import { uploadMovie } from './actions';

export interface IUploadMovieProps {
    dispatch: Dispatch
}

export interface IUploadMovieState {
    title: string
    description: string
    shortDescription: string
    posterFile: UploadFile | null,
    movieFile: UploadFile | null,
}

export class UploadMovie extends Component<IUploadMovieProps, IUploadMovieState> {
    state: Readonly<IUploadMovieState> = {
        title: '',
        description: '',
        shortDescription: '',
        posterFile: null,
        movieFile: null,
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { title, description, shortDescription, posterFile, movieFile } = this.state;
        if (!title || !description || !shortDescription || !posterFile || !movieFile) return;

        const { dispatch } = this.props;
        dispatch(uploadMovie(title, description, shortDescription, posterFile, movieFile));
    };

    handleTitle = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        this.setState({ title: target.value });
    };

    handleDescription = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        this.setState({ description: target.value });
    };

    handleShortDescription = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        this.setState({ shortDescription: target.value });
    };

    onUploadPoster = (info: UploadChangeParam) => {
        const { file } = info;

        if (file && file.type.split('/')[0] === 'image') {
            message.success(`${file.name} file uploaded successfully.`);
            this.setState({ posterFile: file });
        }
        else {
            message.error(`${file.name} file upload failed.`);
        }
    };

    onUploadMovie = (info: UploadChangeParam) => {
        const { file } = info;

        if (file.type === 'video/mp4') {
            message.success(`${file.name} file uploaded successfully.`);
            this.setState({ movieFile: file });
        }
        else {
            message.error(`${file.name} file upload failed.`);
        }
    };

    render() {
        const { title, description, shortDescription } = this.state;

        return (
          <Layout className="upload-page-container">
              <PageHeader
                title="Upload"
                subTitle="Postez vos courts métrages sur la plateforme !"
                className="upload-page-header"
              />
              <div className="upload-form">
                  <Form onSubmit={this.handleSubmit}>
                      <Form.Item
                        label="Titre du court métrage"
                        required
                      >
                          <Input
                            value={title}
                            onChange={this.handleTitle}
                            placeholder="Ex: Vive les mouettes"
                            required
                          />
                      </Form.Item>
                      <Form.Item
                        label="Description du court métrage"
                        required
                      >
                          <Input.TextArea
                            value={description}
                            onChange={this.handleDescription}
                            placeholder="Ex: Un jeune homme cruel se lance dans une bataille contre les mouettes"
                            required
                            autosize
                          />
                      </Form.Item>
                      <Form.Item
                        label="Description rapide du court métrage"
                        required
                      >
                          <Input.TextArea
                            value={shortDescription}
                            onChange={this.handleShortDescription}
                            placeholder="Ex: Plein de mouettes !"
                            required
                            autosize
                          />
                      </Form.Item>
                      <Form.Item
                        required
                        label="Affiche du court métrage"
                      >
                          <Upload.Dragger
                            name="file"
                            onChange={this.onUploadPoster}
                            beforeUpload={() => false}
                          >
                              <p className="ant-upload-drag-icon">
                                  <Icon type="inbox"/>
                              </p>
                              <p className="ant-upload-text">Ajoutez l'affiche du court métrage</p>
                              <p className="ant-upload-hint">Celle-ci sera utilisée comme vignette représentative de votre film</p>
                          </Upload.Dragger>
                      </Form.Item>
                      <Form.Item
                        required
                        label="Court métrage"
                      >
                          <Upload.Dragger
                            name="file"
                            onChange={this.onUploadMovie}
                            beforeUpload={() => false}
                          >
                              <p className="ant-upload-drag-icon">
                                  <Icon type="inbox"/>
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
}

export default connect()(UploadMovie);
