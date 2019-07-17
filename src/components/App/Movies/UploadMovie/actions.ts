import {UploadFile} from "antd/es/upload/interface";

import { UPLOAD_MOVIE } from '../../../../reducers/uploadMovie/constantes';
import { IActorForm, IDirectorForm, IStaffForm } from '../../interfaces';

export const uploadMovie = (
  title: string,
  summary: string,
  summarySmall: string,
  releaseDate: string,
  actors: IActorForm[],
  directors: IDirectorForm[],
  staff: IStaffForm[],
  posterFile: UploadFile,
  movieFile: UploadFile,
) => ({
    type: UPLOAD_MOVIE,
    payload: {
        title,
        summary,
        summarySmall,
        releaseDate,
        actors,
        directors,
        staff,
        posterFile,
        movieFile,
    }
});
