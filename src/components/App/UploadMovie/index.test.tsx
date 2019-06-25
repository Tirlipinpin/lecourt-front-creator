import React, {FormEvent, SyntheticEvent} from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';

import { UploadMovie } from '.';


describe('The UploadMovie component', () => {
    let wrapper: ShallowWrapper<UploadMovie>;
    const dispatch = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <UploadMovie
              dispatch={dispatch}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
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

    it('should update description state when changing description', () => {
        const instance = wrapper.instance() as UploadMovie;
        const event = {
            target: {
                value: 'poney',
            },
        } as unknown;

        instance.handleDescription(event as SyntheticEvent);

        expect(wrapper.state('description')).toEqual('poney');
    });

    it('should update short description state when changing short description', () => {
        const instance = wrapper.instance() as UploadMovie;
        const event = {
            target: {
                value: 'poney',
            },
        } as unknown;

        instance.handleShortDescription(event as SyntheticEvent);

        expect(wrapper.state('shortDescription')).toEqual('poney');
    });

    it('should dispatch a uploadMovie action when submitting form', () => {
        const instance = wrapper.instance() as UploadMovie;
        const state = {
            title: 'poney',
            description: 'poney magique',
            shortDescription: 'my little poney',
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