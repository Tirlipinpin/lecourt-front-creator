import React, { FormEvent, ReactElement, SyntheticEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, DatePicker, Select, Layout, PageHeader } from 'antd';
import moment from 'moment';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { IMovieDetails, MovieRelation } from '../../interfaces';
import { Location } from 'history';
import { FETCH_CAMPAIGN, UPDATE_EDITING_CAMPAIGN, UPDATE_CAMPAIGN } from '../../../../reducers/campaigns/constants';
import { match, RouterProps } from 'react-router';
import './index.css';

const { RangePicker } = DatePicker;

interface IProps extends RouterProps {
    location: Location
    match: match<{ id: string }>
}

export default (props: IProps) => {
    const dispatch = useDispatch();
    const { uploadedMovies, editingCampaign, editedCampaign } = useSelector((state: any) => ({
        uploadedMovies: state.uploadedMovies,
        editingCampaign: state.campaigns.editingCampaign,
        editedCampaign: state.campaigns.editedCampaign,
    }));

    useEffect(() => {
        dispatch({
            type: FETCH_CAMPAIGN,
            payload: {
                id: props.match.params.id,
            },
        });
        dispatch({ type: 'FETCH_UPLOADED_MOVIES' });
    }, [dispatch, props.match.params.id]);

    const form = {
        enabled: editingCampaign ? editingCampaign.enabled : false,
        id: editingCampaign ? editingCampaign.id : '',
        name: editingCampaign ? editingCampaign.name : '',
        startDate: editingCampaign ? moment(editingCampaign.start_date) : moment(),
        endDate: editingCampaign ? moment(editingCampaign.end_date) : moment(),
        movies: editingCampaign ? editingCampaign.movies : [],
    };

    const filterOptions = (input: string, option: ReactElement): boolean => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { name, startDate, endDate, movies} = form;
        if (!name || !startDate || !endDate || !movies)
             return;

        dispatch({
            type: UPDATE_CAMPAIGN,
            payload: form,
        });
    };

    const updateFormStrings = (e: SyntheticEvent): void => {
        const { value, name } = e.target as HTMLInputElement;
        if (!editingCampaign) {
            return;
        }

        dispatch({
            type: UPDATE_EDITING_CAMPAIGN,
            payload: {
                ...editingCampaign,
                [name]: value,
            },
        });
    };

    const updateFormDates = (dates: RangePickerValue) => {
        if (!Array.isArray(dates) || dates.length !== 2 || !dates[0] || !dates[1]) {
            return;
        }

        dispatch({
            type: UPDATE_EDITING_CAMPAIGN,
            payload: {
                ...editingCampaign,
                startDate: dates[0].format(),
                endDate: dates[1].format(),
            },
        });
    };

    const updateFormMovies = (movies: string[], _: any) => {
        if (!editingCampaign) {
            return;
        }

        dispatch({
            type: UPDATE_EDITING_CAMPAIGN,
            payload: {
                ...editingCampaign,
                movies: movies.map((id) => ({ movie: { id } })),
            },
        });
    };

    const handleCancel = () => {
        props.history.push('/app/campaigns');
    };

    useEffect(() => {
        if (editedCampaign) {
            handleCancel();
        }
    });

    return (
        <Layout className="campaigns-edit-page-container">
            <PageHeader
                title="Edition d'une campagne"
                subTitle="Explorez vos courts métrages postés sur la platforme et définissez leurs paramètres"
                className="campaigns-edit-page-header"
            />
            <Form onSubmit={handleSubmit} className="campaign-edit-form">
                <Form.Item
                    label="Nom de la campagne"
                    required
                >
                <Input
                    value={form.name}
                    onChange={updateFormStrings}
                    name="name"
                />
                </Form.Item>
                <Form.Item
                    label="Dates de diffusion de la campagne"
                    required
                >
                    <RangePicker
                        showTime
                        format="YYYY-MM-DD"
                        onChange={updateFormDates}
                        value={[form.startDate, form.endDate]}
                    />
                </Form.Item>
                <Form.Item
                    label="Liste des films à ajouter dans la campagne"
                    required
                >
                    <Select
                        optionFilterProp="children"
                        filterOption={filterOptions}
                        allowClear
                        mode="multiple"
                        onChange={updateFormMovies}
                        value={form.movies.map((m: MovieRelation) => m.movie.id)}
                    >
                        {uploadedMovies.movies.map((movie: IMovieDetails) => <Select.Option key={movie.id}>{movie.title}</Select.Option>)}
                    </Select>
                </Form.Item>
                <span className="campaigns-edit-form-buttons">
                    <Button block onClick={handleCancel}>Annuler</Button>
                    <Button htmlType="submit" block type="primary">Valider</Button>
                </span>
            </Form>
        </Layout>
    );
};
