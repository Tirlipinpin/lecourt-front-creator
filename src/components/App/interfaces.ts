export interface Person {
    id: string
    first_name: string
    last_name: string
    birth_date: string
}

export interface IActorForm {
    id: string
    role: string
}

export type directorForm = string

export interface IStaffForm {
    id: string
    job: string
}

export type genreForm = string

export interface Genre {
    id: string
    code: string
}

export interface Country {
    id: string
    code: string
}

export interface Image {
    id: string
    type: string
    path: string
}

export interface ActorRelation {
    person: Person
    role: string
}

export interface StaffRelation {
    person: Person
    job: string
}

export interface DirectorRelation {
    person: Person
}

export interface ImageRelation {
    file: Image
}

export interface IGenreRelation {
    genre: Genre
}

export interface FileRelation {
    file: File
}

export interface MovieRelation {
    movie: IMovieDetails
}

export interface IMovieDetails {
    id: string
    title: string
    releaseDate: string
    summary: string
    summarySmall: string
    duration: number
    createdAt: string
    updatedAt: string
    actors: ActorRelation[]
    directors: DirectorRelation[]
    staff: StaffRelation[]
    posters: ImageRelation[]
    genres: IGenreRelation[]
    files: FileRelation[],
    result_quality: number
}

export interface ICampaign {
    id: string
    name: string
    note: string
    start_date: number
    end_date: number
    enabled: boolean
    movies: MovieRelation[]
}

export interface ICampaignMutation extends ICampaign {
    movies_id: string[]
}

/* Entity creation data models */
export interface IPersonCreationModel {
    first_name: string
    last_name: string
    birth_date: string
}

export interface IGenreCreationModel {
    name: string
}

export interface ICountryCreationModel {
    name: string
}
