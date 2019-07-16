import React, {FormEvent, ReactElement, SyntheticEvent, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import moment from 'moment';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { IMovieDetails } from '../../interfaces';
import {createCampaign} from './actions';

const { RangePicker } = DatePicker;

export interface ICreateCampaignFormProps {
    visible: boolean
    handleVisibility: any
}

export default (props: ICreateCampaignFormProps) => {
    const { uploadedMovies } = useSelector((state: any) => ({
        uploadedMovies: state.uploadedMovies,
    }));

    const dispatch = useDispatch();

    const [ form, setFormValues ] = useState({
        name: '',
        startTime: 0,
        endTime: 0,
        note: '',
        movies: [] as string[],
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

        dispatch(createCampaign(form));
    };

    const updateFormStrings = (e: SyntheticEvent): void => {
        const { value, name } = e.target as HTMLInputElement;
        setFormValues({
            ...form,
            [name]: value,
        });
    };

    const updateFormDates = (_: RangePickerValue, dates: [string, string]) => {
        console.log(_);
        setFormValues({
            ...form,
            startTime: moment(dates[0]).valueOf(),
            endTime: moment(dates[1]).valueOf(),
        });
    };

    const updateFormMovies = (value: string[], options: any) => {
        setFormValues({
          ...form,
            movies: value,
        });
    };

    return (
      <Modal
        title="Créer la campagne de diffusion"
        visible={props.visible}
        onCancel={() => props.handleVisibility(false)}
        footer={null}
      >
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
                  >
                      {uploadedMovies.movies.map((movie: IMovieDetails) => (
                        <Select.Option key={movie.id}>
                            {movie.title}
                        </Select.Option>
                      ))}
                  </Select>
              </Form.Item>
              <Button htmlType="submit">Créer</Button>
        </Form>
      </Modal>
    )
}