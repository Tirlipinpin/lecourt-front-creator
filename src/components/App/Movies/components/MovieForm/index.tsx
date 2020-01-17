import React, {FormEvent, SyntheticEvent, PureComponent, ReactElement} from 'react';
import {
    Button,
    DatePicker,
    Form,
    Icon,
    Input,
    message,
    Upload,
    Select,
} from 'antd';
import moment, { Moment } from 'moment';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import PersonsSelect from './components/PersonsSelect';
import RoleSelect from './components/RoleSelect';
import {
    IActorForm,
    directorForm,
    IStaffForm,
    genreForm,
    IMovieDetails,
    Person,
    Genre,
} from '../../../interfaces';
import {
    convertActors,
    convertDirectors,
    convertGenres,
    convertStaffPersons,
} from './services';
import Loader from 'components/shared/Loader';
import './index.css';

export interface IMovieFormState {
    actors: IActorForm[]
    actualPerson: string
    addPerson?: (id: string, role: string) => void
    directors: directorForm[]
    genres: genreForm[]
    movieFile: UploadFile | null
    modalVisible: boolean
    movieFileList: UploadFile[]
    posterFile: UploadFile | null
    posterFileList: UploadFile[]
    releaseDate: string
    staff: IStaffForm[]
    summary: string
    summarySmall: string
    title: string
}

export interface IMovieFormProps {
    disabled?: boolean
    genres: Genre[]
    loading: boolean
    movie?: IMovieDetails
    onSubmit: (movie: IMovieFormState) => void
    persons: Person[]
    updateForm?: boolean
}

export class MovieForm extends PureComponent<IMovieFormProps, IMovieFormState> {
    state: Readonly<IMovieFormState> = {
        title: '',
        summary: '',
        summarySmall: '',
        releaseDate: '',
        actors: [],
        directors: [],
        staff: [],
        genres: [],
        posterFile: null,
        movieFile: null,
        modalVisible: false,
        actualPerson: '',
        posterFileList: [],
        movieFileList: [],
    };

    componentDidUpdate(prevProps: IMovieFormProps) {
        const { movie } = this.props;
        const { movie: prevMovie } = prevProps;

        if (!movie || movie === prevMovie) return;

        const {
            actors,
            directors,
            genres,
            releaseDate,
            staff,
            summarySmall,
            summary,
            title,
        } = movie;

        this.setState({
            actors: convertActors(actors),
            directors: convertDirectors(directors),
            genres: convertGenres(genres),
            releaseDate: moment(releaseDate).format('YYYY-MM-DD'),
            staff: convertStaffPersons(staff),
            summarySmall,
            summary,
            title,
        });
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { onSubmit } = this.props;
        onSubmit(this.state);
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

    handleReleaseDate = (date: Moment | null, dateString: string) => {
        this.setState({ releaseDate: dateString });
    };

    handleActor = (id: string, role: string) => {
        const actors: IActorForm[] = [ ...this.state.actors ];

        actors.push({ id, role });
        this.setState({ actors });
    };

    handleActorSelect = (e: string) => {
        this.setState({ addPerson: this.handleActor, actualPerson: e });
        this.handleShowModal();
    };

    handleActorDeselect = (e: string) => {
        const actors: IActorForm[] = [...this.state.actors];
        const index = actors.findIndex((actor) => actor.id === e);

        if (index !== -1) {
            actors.splice(index, 1);
            this.setState({ actors });
        }
    };

    handleDirectorSelect = (id: string) => {
        const directors: directorForm[] = [ ...this.state.directors ];

        directors.push(id);
        this.setState({ directors });
    };

    handleDirectorDeselect = (e: string) => {
        const directors: directorForm[] = [...this.state.directors];
        const index = directors.findIndex((director) => director === e);

        if (index !== -1) {
            directors.splice(index, 1);
            this.setState({ directors });
        }
    };

    handleStaff= (id: string, job: string) => {
        const staff = [ ...this.state.staff ];

        staff.push({ id, job });
        this.setState({ staff });
    };

    handleStaffSelect = (e: string) => {
        this.setState({ addPerson: this.handleStaff, actualPerson: e });
        this.handleShowModal();
    };

    handleStaffDeselect = (e: string) => {
        const staff: IStaffForm[] = [...this.state.staff];
        const index = staff.findIndex((staff) => staff.id === e);

        if (index !== -1) {
            staff.splice(index, 1);
            this.setState({ staff });
        }
    };

    handleGenreSelect = (genreId: any) => {
        const genres = [ ...this.state.genres ];

        genres.push(genreId);
        this.setState({ genres });
    };

    handleGenreDeselect = (e: any) => {
        const genres: genreForm[] = [...this.state.genres];
        const index = genres.findIndex((genre) => genre === e);

        if (index !== -1) {
            genres.splice(index, 1);
            this.setState({ genres });
        }
    };

    onUploadPoster = (info: UploadChangeParam) => {
        const { file } = info;

        if (file && file.type.split('/')[0] === 'image') {
            message.success(`${file.name} file uploaded successfully.`);
            this.setState({
                posterFile: file,
                posterFileList: [ ...info.fileList ].slice(-1),
            });
        }
        else {
            message.error(`${file.name} file upload failed.`);
        }
    };

    onUploadMovie = (info: UploadChangeParam) => {
        const { file } = info;

        if (file.type === 'video/mp4') {
            message.success(`${file.name} file uploaded successfully.`);
            this.setState({
                movieFile: file,
                movieFileList: [ ...info.fileList ].slice(-1),
            });
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
        const {
            title,
            summary,
            summarySmall,
            modalVisible,
            addPerson,
            actualPerson,
            movieFileList,
        } = this.state;
        const {
            disabled,
            genres,
            loading,
            persons,
            updateForm,
            movie
        } = this.props;

        if (loading) return <Loader size='3vw' />;

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
                            autoSize
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
                            autoSize
                          />
                      </Form.Item>
                      <Form.Item
                        label="Date de sortie du court métrage"
                        required
                      >
                          <DatePicker
                            format="YYYY-MM-DD"
                            onChange={this.handleReleaseDate}
                            defaultValue={moment(movie?.releaseDate)}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Les acteurs de votre court métrage"
                        required
                      >
                          <PersonsSelect
                            defaultValue={movie?.actors.map(actor => actor.node.id)}
                            filterOptions={this.filterOptions}
                            onDeselect={this.handleActorDeselect}
                            onSelect={this.handleActorSelect}
                            persons={persons}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Les directeurs de votre court métrage"
                        required
                      >
                          <PersonsSelect
                            defaultValue={movie?.directors.map(director => director.node.id)}
                            filterOptions={this.filterOptions}
                            onDeselect={this.handleDirectorDeselect}
                            onSelect={this.handleDirectorSelect}
                            persons={persons}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Le staff de votre court métrage"
                        required
                      >
                          <PersonsSelect
                            defaultValue={movie?.staff.map(person => person.node.id)}
                            filterOptions={this.filterOptions}
                            onDeselect={this.handleStaffDeselect}
                            onSelect={this.handleStaffSelect}
                            persons={persons}
                          />
                      </Form.Item>
                      <Form.Item
                        label="Les genres de votre court métrage"
                        required
                      >
                          <Select
                            defaultValue={movie?.genres.map(genre => genre.node.id)}
                            mode="multiple"
                            style={{ width: '100%' }}
                            allowClear
                            placeholder="Vous pouvez en rechercher"
                            optionFilterProp="children"
                            filterOption={this.filterOptions}
                            onSelect={this.handleGenreSelect}
                            onDeselect={this.handleGenreDeselect}
                          >
                              {genres.map((genre: Genre) => (
                                <Select.Option key={genre.id}>
                                    {genre.name}
                                </Select.Option>
                              ))}
                          </Select>
                      </Form.Item>
                      {!updateForm && [
                        <Form.Item
                            key="poster"
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
                        </Form.Item>,
                        <Form.Item
                            key="movie"
                            required
                            label="Court métrage"
                        >
                            <Upload.Dragger
                                name="file"
                                onChange={this.onUploadMovie}
                                beforeUpload={() => false}
                                accept="video/*"
                                fileList={movieFileList}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox"/>
                                </p>
                                <p className="ant-upload-text">Ajoutez votre court métrage</p>
                            </Upload.Dragger>
                        </Form.Item>
                      ]}
                      <Button
                        icon="upload"
                        htmlType="submit"
                        className="upload-movie-button"
                        disabled={disabled}
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

export default MovieForm;
