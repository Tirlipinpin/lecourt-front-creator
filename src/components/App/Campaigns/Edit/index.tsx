import React, { FormEvent, ReactElement, SyntheticEvent, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, DatePicker, Select, Layout, PageHeader } from 'antd';
import moment from 'moment';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { IMovieDetails, MovieRelation } from '../../interfaces';
import { Location } from 'history';
import { FETCH_CAMPAIGN, UPDATE_EDITING_CAMPAIGN, UPDATE_CAMPAIGN } from '../../../../reducers/campaigns/constantes';
import { match, RouterProps } from 'react-router';

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
        })
        dispatch({ type: 'FETCH_UPLOADED_MOVIES' })
    }, [])

    /*useEffect(() => {
        return () => {
            dispatch({
                type: UPDATE_EDITING_CAMPAIGN,
                payload: null,
            })
        }
    }, [])*/

    const form = {
        enabled: editingCampaign ? editingCampaign.enabled : false,
        id: editingCampaign ? editingCampaign.id : '',
        name: editingCampaign ? editingCampaign.name : '',
        startTime: editingCampaign ? editingCampaign.startTime : 0,
        endTime: editingCampaign ? editingCampaign.endTime : 0,
        movies: editingCampaign ? editingCampaign.movies : [],
        // note: editingCampaign ? editingCampaign.note : '-',
        note: '-',
    }

    const filterOptions = (input: string, option: ReactElement): boolean => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { name, startTime, endTime, note, movies} = form;
        if (!name || !startTime || !endTime || !note || !movies)
             return;

        dispatch({
            type: UPDATE_CAMPAIGN,
            payload: form,
        });
    };

    const updateFormStrings = (e: SyntheticEvent): void => {
        const { value, name } = e.target as HTMLInputElement;
        if (!editingCampaign) {
            return
        }

        dispatch({
            type: UPDATE_EDITING_CAMPAIGN,
            payload: {
                ...editingCampaign,
                [name]: value,
            },
        })
    };

    const updateFormDates = (_: RangePickerValue, dates: [string, string]) => {
        if (!editingCampaign) {
            return
        }

        dispatch({
            type: UPDATE_EDITING_CAMPAIGN,
            payload: {
                ...editingCampaign,
                startTime: moment(dates[0]).valueOf(),
                endTime: moment(dates[1]).valueOf(),
            },
        })
    };

    const updateFormMovies = (movies: string[], _: any) => {
        if (!editingCampaign) {
            return
        }

        dispatch({
            type: UPDATE_EDITING_CAMPAIGN,
            payload: {
                ...editingCampaign,
                movies: movies.map((id) => ({ node: { id } })),
            },
        })
    };

    const handleCancel = () => {
        props.history.push('/app/campaigns')
    }

    useEffect(() => {
        if (editedCampaign) {
            handleCancel()
        }
    })

    return (
        <Layout className="campaigns-page-container">
            <PageHeader
                title="Edition d'une campagne"
                subTitle="Explorez vos courts métrages postés sur la platforme et définissez leurs paramètres"
                className="movies-page-header"
            />
            <Form onSubmit={handleSubmit}>
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
                    label="Note de la campagne"
                    required
                >
                <Input.TextArea
                    value={form.note}
                    onChange={updateFormStrings}
                    name="note"
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
                        value={[moment(form.startTime), moment(form.endTime)]}
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
                        value={form.movies.map((m: MovieRelation) => m.node.id)}
                    >
                        {uploadedMovies.movies.map((movie: IMovieDetails) => <Select.Option key={movie.id}>{movie.title}</Select.Option>)}
                    </Select>
                </Form.Item>
                <span style={{ display: 'flex' }}>
                    <Button htmlType="submit" block>Valider</Button>
                    <Button block onClick={handleCancel}>Annuler</Button>
                </span>
            </Form>
        </Layout>
    )
}