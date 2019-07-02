import React, {FormEvent, SyntheticEvent, Component, ReactElement} from 'react';
import {
    Button,
    DatePicker,
    Form,
    Icon,
    Input,
    Layout,
    message,
    PageHeader,
    Upload,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Moment } from 'moment';

import { uploadMovie } from './actions';
import PersonsSelect from './components/PersonsSelect';
import { FETCH_PERSONS } from '../../../reducers/uploadMovie/constantes';
import { IUploadMovieStore } from '../../../reducers/uploadMovie';
import './index.css';

export interface IUploadMovieProps {
    dispatch: Dispatch
    uploadMovie: IUploadMovieStore
}

export interface IUploadMovieState {
    title: string
    summary: string
    summarySmall: string
    releaseDate: string
    actors: string[]
    directors: string[]
    staff: string[]
    posterFile: UploadFile | null,
    movieFile: UploadFile | null,
}

export class UploadMovie extends Component<IUploadMovieProps, IUploadMovieState> {
    state: Readonly<IUploadMovieState> = {
        title: '',
        summary: '',
        summarySmall: '',
        releaseDate: '',
        actors: [],
        directors: [],
        staff: [],
        posterFile: null,
        movieFile: null,
    };

    componentDidMount(): void {
        const { dispatch } = this.props;

        dispatch({ type: FETCH_PERSONS });
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { title, summary, summarySmall, releaseDate, actors, directors, staff, posterFile, movieFile } = this.state;
        if (!title || !summary || !summarySmall || !releaseDate || actors.length < 1 || directors.length < 1 || staff.length < 1 || !posterFile || !movieFile) return;

        const { dispatch } = this.props;
        dispatch(uploadMovie(
          title,
          summary,
          summarySmall,
          releaseDate,
          actors,
          directors,
          staff,
          posterFile,
          movieFile
        ));
    };

    handleTitle = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        this.setState({ title: target.value });
    };

    handleDescription = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        this.setState({ summary: target.value });
    };

    handleShortDescription = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        this.setState({ summarySmall: target.value });
    };

    handleReleaseDate = (date: Moment, dateString: string) => {
        this.setState({ releaseDate: dateString });
    };

    handleActors = (actors: string[]) => {
        this.setState({ actors });
    };

    handleDirectors = (directors: string[]) => {
        this.setState({ directors });
    };

    handleStaff = (staff: string[]) => {
        this.setState({ staff });
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

    filterOptions = (input: string, option: ReactElement) => {
        return option.props.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    render() {
        const { title, summary, summarySmall } = this.state;
        const { persons, loading } = this.props.uploadMovie;

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
                            value={summary}
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
                            value={summarySmall}
                            onChange={this.handleShortDescription}
                            placeholder="Ex: Plein de mouettes !"
                            required
                            autosize
                          />
                      </Form.Item>
                      <Form.Item
                        label="Date de sortie du court métrage"
                        required
                      >
                          <DatePicker
                            format="YYYY-MM-DD"
                            onChange={this.handleReleaseDate}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Les acteurs de votre court métrage"
                        required
                      >
                          <PersonsSelect
                            persons={persons}
                            handleChange={this.handleActors}
                            filterOptions={this.filterOptions}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Les directeurs de votre court métrage"
                        required
                      >
                          <PersonsSelect
                            persons={persons}
                            handleChange={this.handleDirectors}
                            filterOptions={this.filterOptions}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Le staff de votre court métrage"
                        required
                      >
                          <PersonsSelect
                            persons={persons}
                            handleChange={this.handleStaff}
                            filterOptions={this.filterOptions}
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
                            accept="image/*"
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
                            accept="video/*"
                          >
                              <p className="ant-upload-drag-icon">
                                  <Icon type="inbox"/>
                              </p>
                              <p className="ant-upload-text">Ajoutez votre court métrage</p>
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

export default connect(({ uploadMovie }: any) => ({
    uploadMovie,
}))(UploadMovie);
