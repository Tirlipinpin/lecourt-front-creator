import React, {FormEvent, SyntheticEvent} from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';
import { Moment } from 'moment';

import { UploadMovie } from '.';


describe('The UploadMovie component', () => {
    let wrapper: ShallowWrapper<UploadMovie>;
    const dispatch = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <UploadMovie
              dispatch={dispatch}
              uploadMovie={{ loading: false, persons: [] }}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should dispatch a FETCH_PERSONS action on mount', () => {
        expect(dispatch).toHaveBeenCalledWith({
            type: 'FETCH_PERSONS',
        })
    });

    it('should update movie state when uploading a movie', () => {
        const instance = wrapper.instance() as UploadMovie;
        const info = {
            file: {
                name: 'poney',
                type: 'video/mp4',
            },
        } as UploadChangeParam;

        instance.onUploadMovie(info);

        expect(wrapper.state('movieFile')).toEqual(info.file);
    });

    it('should update poster state when uploading a poster', () => {
        const instance = wrapper.instance() as UploadMovie;
        const info = {
            file: {
                name: 'poney',
                type: 'image',
            },
        } as UploadChangeParam;

        instance.onUploadPoster(info);

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
        const actors = [ 'poney', 'magique', '42' ];

        instance.handleActors(actors);

        expect(wrapper.state('actors')).toEqual(actors);
    });

    it('should update directors list state when changing directors', () => {
        const instance = wrapper.instance() as UploadMovie;
        const directors = [ 'poney', 'magique', '42' ];

        instance.handleDirectors(directors);

        expect(wrapper.state('directors')).toEqual(directors);
    });

    it('should update staff list state when changing staff', () => {
        const instance = wrapper.instance() as UploadMovie;
        const staff = [ 'poney', 'magique', '42' ];

        instance.handleStaff(staff);

        expect(wrapper.state('staff')).toEqual(staff);
    });

    it('should dispatch a uploadMovie action when submitting form', () => {
        const instance = wrapper.instance() as UploadMovie;
        const state = {
            title: 'poney',
            summary: 'poney magique',
            summarySmall: 'my little poney',
            releaseDate: '1998-09-20',
            actors: ['poney'],
            directors: ['poney'],
            staff: ['poney'],
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