import {UploadFile} from "antd/es/upload/interface";

import { UPLOAD_MOVIE } from '../../../reducers/uploadMovie/constantes';

export const uploadMovie = (title: string, description: string, shortDescription: string, posterFile: UploadFile, movieFile: UploadFile) => ({
    type: UPLOAD_MOVIE,
    payload: {
        title,
        description,
        shortDescription,
        posterFile,
        movieFile,
    }
});
