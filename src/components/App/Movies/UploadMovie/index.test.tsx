import React, {FormEvent, SyntheticEvent} from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';
import { Moment } from 'moment';

import { UploadMovie } from '.';
import {
    IActorForm,
    directorForm,
    genreForm,
    IStaffForm,
} from '../../interfaces';


describe('The UploadMovie component', () => {
    let wrapper: ShallowWrapper<UploadMovie>;
    const dispatch = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <UploadMovie
              dispatch={dispatch}
              uploadMovie={{ persons: [], genres: [], visible: false }}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should dispatch a FETCH_MOVIE_CREATION_DATA action on mount', () => {
        expect(dispatch).toHaveBeenCalledWith({
            type: 'FETCH_MOVIE_CREATION_DATA',
        })
    });

    it('should update movie state when uploading a movie', () => {
        const instance = wrapper.instance() as UploadMovie;
        const info = {
            file: {
                name: 'poney',
                type: 'video/mp4',
            },
            fileList: [],
        } as any;

        instance.onUploadMovie(info as UploadChangeParam);

        expect(wrapper.state('movieFile')).toEqual(info.file);
    });

    it('should update poster state when uploading a poster', () => {
        const instance = wrapper.instance() as UploadMovie;
        const info = {
            file: {
                name: 'poney',
                type: 'image',
            },
            fileList: [],
        } as any;

        instance.onUploadPoster(info as UploadChangeParam);

        expect(wrapper.state('posterFile')).toEqual(info.file);
    });

    it('should update title state when changing title', () => {
        const instance = wrapper.instance() as UploadMovie;
        const event = {
            target: {
                value: 'poney',
            },
        } as unknown;

        instance.handleTitle(event as SyntheticEvent);

        expect(wrapper.state('title')).toEqual('poney');
    });

    it('should update summary state when changing summary', () => {
        const instance = wrapper.instance() as UploadMovie;
        const event = {
            target: {
                value: 'poney',
            },
        } as unknown;

        instance.handleDescription(event as SyntheticEvent);

        expect(wrapper.state('summary')).toEqual('poney');
    });

    it('should update summary small state when changing summary small', () => {
        const instance = wrapper.instance() as UploadMovie;
        const event = {
            target: {
                value: 'poney',
            },
        } as unknown;

        instance.handleShortDescription(event as SyntheticEvent);

        expect(wrapper.state('summarySmall')).toEqual('poney');
    });

    it('should update release date state when changing release date', () => {
        const instance = wrapper.instance() as UploadMovie;

        instance.handleReleaseDate({} as Moment, '1998-09-20');

        expect(wrapper.state('releaseDate')).toEqual('1998-09-20');
    });

    it('should update actors list state when changing actors', () => {
        const instance = wrapper.instance() as UploadMovie;
        const actors: IActorForm[] = [
            { id: 'poney', role: 'licorne' },
            { id: 'magique', role: 'balais' },
        ];

        instance.handleActor('poney', 'licorne');
        instance.handleActor('magique', 'balais');

        expect(wrapper.state('actors')).toEqual(actors);
    });

    it('should update directors list state when changing directors', () => {
        const instance = wrapper.instance() as UploadMovie;
        const directors: directorForm[] = [
            'poney',
            'magique',
        ];

        instance.handleDirectorSelect('poney');
        instance.handleDirectorSelect('magique');

        expect(wrapper.state('directors')).toEqual(directors);
    });

    it('should update staff list state when changing staff', () => {
        const instance = wrapper.instance() as UploadMovie;
        const staff = [
            { id: 'poney', job: 'licorne' },
            { id: 'magique', job: 'balais' }
        ];

        instance.handleStaff('poney', 'licorne');
        instance.handleStaff('magique', 'balais');

        expect(wrapper.state('staff')).toEqual(staff);
    });

    it('should dispatch a uploadMovie action when submitting form', () => {
        const instance = wrapper.instance() as UploadMovie;
        const state = {
            title: 'poney',
            summary: 'poney magique',
            summarySmall: 'my little poney',
            releaseDate: '1998-09-20',
            actors: [{ id: '1234', role: 'batman' }] as IActorForm[],
            directors: [ '1234' ] as directorForm[],
            staff: [{ id: '1234' }] as IStaffForm[],
            genres: [ '1234' ] as genreForm[],
            posterFile: { name: 'poster' } as UploadFile,
            movieFile: { name: 'video'} as UploadFile,
        };

        instance.setState(state);

        instance.handleSubmit({ preventDefault(): void {} } as FormEvent);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'UPLOAD_MOVIE',
            payload: { ...state },
        });
    })
});