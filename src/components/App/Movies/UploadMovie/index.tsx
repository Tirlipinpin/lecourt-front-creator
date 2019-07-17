import React, {FormEvent, SyntheticEvent, Component, ReactElement} from 'react';
import {
    Button,
    DatePicker,
    Form,
    Icon,
    Input,
    message,
    Upload,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Moment } from 'moment';

import { uploadMovie } from './actions';
import PersonsSelect from './components/PersonsSelect';
import RoleSelect from './components/RoleSelect';
import { FETCH_PERSONS } from '../../../../reducers/uploadMovie/constantes';
import { IUploadMovieStore } from '../../../../reducers/uploadMovie';
import { IActorForm, IDirectorForm, IStaffForm } from '../../interfaces';
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
    actors: IActorForm[]
    directors: IDirectorForm[]
    staff: IStaffForm[]
    posterFile: UploadFile | null
    movieFile: UploadFile | null
    modalVisible: boolean
    addPerson?: (id: string, role: string) => void
    actualPerson: string
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
        modalVisible: false,
        actualPerson: '',
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

    handleActor = (actorId: string, role: string) => {
        const actors = [ ...this.state.actors ];

        actors.push({ actorId, role });
        this.setState({ actors });
    };

    handleActorSelect = (e: string) => {
        this.setState({ addPerson: this.handleActor, actualPerson: e });
        this.handleShowModal();
    };

    handleActorDeselect = (e: string) => {
        const actors: IActorForm[] = [...this.state.actors];
        const index = actors.findIndex((actor) => actor.actorId === e);

        if (index !== -1) {
            actors.splice(index, 1);
            this.setState({ actors });
        }
    };

    handleDirectorSelect = (personId: string) => {
        const directors = [ ...this.state.directors ];

        directors.push({ personId });
        this.setState({ directors });
    };

    handleDirectorDeselect = (e: string) => {
        const directors: IDirectorForm[] = [...this.state.directors];
        const index = directors.findIndex((director) => director.personId === e);

        if (index !== -1) {
            directors.splice(index, 1);
            this.setState({ directors });
        }
    };

    handleStaff= (personId: string, job: string) => {
        const staff = [ ...this.state.staff ];

        staff.push({ personId, job });
        this.setState({ staff });
    };

    handleStaffSelect = (e: string) => {
        this.setState({ addPerson: this.handleStaff, actualPerson: e });
        this.handleShowModal();
    };

    handleStaffDeselect = (e: string) => {
        const staff: IStaffForm[] = [...this.state.staff];
        const index = staff.findIndex((staff) => staff.personId === e);

        if (index !== -1) {
            staff.splice(index, 1);
            this.setState({ staff });
        }
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

    handleShowModal = () => {
        this.setState({ modalVisible: true });
    };

    handleHideModal = () => {
        this.setState({ modalVisible: false });
    };

    render() {
        const { title, summary, summarySmall, modalVisible, addPerson, actualPerson } = this.state;
        const { persons, loading } = this.props.uploadMovie;

        return (
          <div>
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
                            filterOptions={this.filterOptions}
                            onSelect={this.handleActorSelect}
                            onDeselect={this.handleActorDeselect}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Les directeurs de votre court métrage"
                        required
                      >
                          <PersonsSelect
                            persons={persons}
                            filterOptions={this.filterOptions}
                            onSelect={this.handleDirectorSelect}
                            onDeselect={this.handleDirectorDeselect}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Le staff de votre court métrage"
                        required
                      >
                          <PersonsSelect
                            persons={persons}
                            filterOptions={this.filterOptions}
                            onSelect={this.handleStaffSelect}
                            onDeselect={this.handleStaffDeselect}
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
              <RoleSelect
                id={actualPerson}
                visible={modalVisible}
                handleHideModal={this.handleHideModal}
                addPerson={addPerson}
              />
          </div>
        );
    }
}

export default connect(({ uploadMovie }: any) => ({
    uploadMovie,
}))(UploadMovie);
