export interface Person {
    id: string
    firstName: string
    lastName: string
    birthDate: string
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
    name: string
}

export interface Country {
    id: string
    name: string
}

export interface Image {
    id: string
    type: string
}

export interface ActorRelation {
    node: Person
    role: string
}

export interface StaffRelation {
    node: Person
    job: string
}

export interface DirectorRelation {
    node: Person
}

export interface ImageRelation {
    node: Image
    type: string
}

export interface IGenreRelation {
    node: Genre
}

export interface FileRelation {
    node: File
}

export interface MovieRelation {
    node: IMovieDetails
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
    images: ImageRelation[]
    genres: IGenreRelation[]
    file: FileRelation,
    result_quality: number
}

export interface ICampaign {
    id: string
    name: string
    note: string
    startTime: number
    endTime: number
    enabled: boolean
    movies: MovieRelation[]
}

/* Entity creation data models */
export interface IPersonCreationModel {
    firstName: string
    lastName: string
    birthDate: string
}

export interface IGenreCreationModel {
    name: string
}

export interface ICountryCreationModel {
    name: string
}
