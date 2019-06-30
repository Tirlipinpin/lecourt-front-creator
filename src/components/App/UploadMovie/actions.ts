import {UploadFile} from "antd/es/upload/interface";

import { UPLOAD_MOVIE } from '../../../reducers/uploadMovie/constantes';

export const uploadMovie = (title: string, summary: string, summarySmall: string, releaseDate: string, posterFile: UploadFile, movieFile: UploadFile) => ({
    type: UPLOAD_MOVIE,
    payload: {
        title,
        summary,
        summarySmall,
        releaseDate,
        posterFile,
        movieFile,
    }
});
