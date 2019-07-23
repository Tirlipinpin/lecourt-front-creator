import React, { FormEvent, ReactElement, SyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, DatePicker, Select, Layout, PageHeader } from 'antd';
import moment from 'moment';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { IMovieDetails, MovieRelation } from '../../interfaces';

const { RangePicker } = DatePicker;

interface IProps {
    history: History
}

export default (props: IProps) => {
    const dispatch = useDispatch();
    const { uploadedMovies, editingCampaign } = useSelector((state: any) => ({
        uploadedMovies: state.uploadedMovies,
        editingCampaign: state.campaigns.editingCampaign,
    }));

    if (!editingCampaign) {
        // TODO : Error handling
    }

    const [ form, setFormValues ] = useState({
        name: editingCampaign.name,
        startTime: editingCampaign.startTime,
        endTime: editingCampaign.endTime,
        note: '',
        movies: editingCampaign.movies.map((m: MovieRelation) => m.node.id),
    });

    const filterOptions = (input: string, option: ReactElement): boolean => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const fetchUploadedMovies = () => {
        dispatch({ type: 'FETCH_UPLOADED_MOVIES' })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { name, startTime, endTime, note, movies} = form;

        if (!name || !startTime || !endTime || !note || movies.length < 1)
            return;

        // dispatch(createCampaign(form));
    };

    const updateFormStrings = (e: SyntheticEvent): void => {
        const { value, name } = e.target as HTMLInputElement;
        setFormValues({
            ...form,
            [name]: value,
        });
    };

    const updateFormDates = (_: RangePickerValue, dates: [string, string]) => {
        setFormValues({
            ...form,
            startTime: moment(dates[0]).valueOf(),
            endTime: moment(dates[1]).valueOf(),
        });
    };

    const updateFormMovies = (value: string[], _: any) => {
        setFormValues({
          ...form,
            movies: value,
        });
    };

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
                        defaultValue={[moment(editingCampaign.startTime), moment(editingCampaign.endTime)]}
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
                        onFocus={fetchUploadedMovies}
                        value={form.movies}
                    >
                        {uploadedMovies.movies.map((movie: IMovieDetails) => <Select.Option key={movie.id}>{movie.title}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Button htmlType="submit">Créer</Button>
            </Form>
        </Layout>
    )
}