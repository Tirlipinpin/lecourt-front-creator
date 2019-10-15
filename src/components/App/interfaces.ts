export interface Person {
  id: string
  firstName: string
  lastName: string
  birthDate: string
}

export interface IActorForm {
  actorId: string
  role: string
}

export interface IDirectorForm {
  personId: string
}

export interface IStaffForm {
  personId: string
  job: string
}

export interface IGenreForm {
  genreId: string
}

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

export interface GenreRelation {
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
  genres: GenreRelation[]
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
};

export interface IGenreCreationModel {
    name: string
};

export interface ICountryCreationModel {
    name: string
}
