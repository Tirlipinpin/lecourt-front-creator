import {UploadFile} from "antd/es/upload/interface";

export const uploadMovie = (title: string, description: string, shortDescription: string, posterFile: UploadFile, movieFile: UploadFile) => ({
    type: 'oui',
    payload: {
        title,
        description,
        shortDescription,
        posterFile,
        movieFile,
    }
});
