import {UploadFile} from "antd/es/upload/interface";

import { UPLOAD_MOVIE } from '../../../../reducers/uploadMovie/constants';
import {IActorForm, directorForm, genreForm, IStaffForm} from '../../interfaces';

export const uploadMovie = (
  title: string,
  summary: string,
  summarySmall: string,
  releaseDate: string,
  actors: IActorForm[],
  directors: directorForm[],
  staff: IStaffForm[],
  genres: genreForm[],
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
        genres,
        posterFile,
        movieFile,
    }
});
