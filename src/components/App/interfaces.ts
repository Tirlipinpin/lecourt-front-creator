export interface Person {
  id: number
  firstName: string
  lastName: string
  birthDate: string
}

export interface Genre {
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

export interface IMovieDetails {
  id: number
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
