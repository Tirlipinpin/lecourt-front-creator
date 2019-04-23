import React, { SyntheticEvent } from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import UploadMovie from '.';
import { UploadChangeParam } from 'antd/lib/upload';


describe('The App component', () => {
    let wrapper: ShallowWrapper<UploadMovie>;

    beforeEach(() => {
        wrapper = shallow(
            <UploadMovie />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should update movie state when uploading a movie', () => {
        const instance = wrapper.instance() as UploadMovie;
        const info = {
            file: {
                status: 'done',
                name: 'poney',
            },
        } as UploadChangeParam;

        instance.onUploadMovie(info);

        expect(wrapper.state('movie')).toEqual(info.file);
    });

    it('should update poster state when uploading a poster', () => {
        const instance = wrapper.instance() as UploadMovie;
        const info = {
            file: {
                status: 'done',
                name: 'poney',
            },
        } as UploadChangeParam;

        instance.onUploadPoster(info);

        expect(wrapper.state('poster')).toEqual(info.file);
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
});