import {
    ActorRelation,
    IActorForm,
    StaffRelation,
    IStaffForm,
    DirectorRelation,
    directorForm,
    IGenreRelation,
    genreForm,
} from 'components/App/interfaces';

export const convertActors = (actors: ActorRelation[]): IActorForm[] => actors.map(actor => ({ id: actor.node.id, role: actor.role }));

export const convertDirectors = (directors: DirectorRelation[]): directorForm[] => directors.map(director => director.node.id);

export const convertGenres = (genres: IGenreRelation[]): genreForm[] => genres.map(genre => genre.node.id);

export const convertStaffPersons = (staffPersons: StaffRelation[]): IStaffForm[] => staffPersons.map(staffPerson => ({ id: staffPerson.node.id, job: staffPerson.job }));
