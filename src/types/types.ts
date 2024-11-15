export interface IMediaItem {
    id: number;
    poster_path: string;
    release_date: string;
    title: string;
    name: string;
    first_air_date: string;
}

export interface IMovie {
    title: string;
    overview: string;
    release_date: string;
    genres: {
        id: number;
        name: string;
    }[];
    poster_path: string;
    runtime: number;
    vote_average: number;
    tagline: string;
    budget: number;
    revenue: number;
}

export interface IMovieTrailer {
    key: string;
    type: string;
}

export interface IMovieActers {
    id: number;
    name: string;
    character: string;
    profile_path: string;
    gender: number;
}

export interface ISearchMovies {
    id: number;
    poster_path: string;
    release_date: string;
    title: string;
    overview: string;
}

export interface IGenres {
    id: number;
    name: string;
}

export interface IProfilePages {
    id: number;
    poster_path: string;
    release_date: string;
    title: string;
    overview: string;
}