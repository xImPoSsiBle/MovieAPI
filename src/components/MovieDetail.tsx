import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchAPI } from "../api/tmdb"
import style from '../styles/MovieDetail.module.css'
import { IMovie, IMovieActers, IMovieTrailer } from "../types/types"
import MovieActors from "./MovieActers";
import Loader from "./Loader"
import Error from "./Error"
import Recommendations from "./Recommendations"

interface IMovieDetailProps {
    userId: string;
    userLogin: boolean;
}

interface IMovieActersResponse {
    cast: IMovieActers[];
}

interface IMovieTrailerResponse {
    id: number;
    results: IMovieTrailer[]
}


const MovieDetail: React.FC<IMovieDetailProps> = ({ userId, userLogin }) => {
    const { id } = useParams<string>()
    const [movie, setMovie] = useState<IMovie | null>(null)
    const [trailer, setTrailer] = useState<string>('')
    const [acters, setActers] = useState<IMovieActers[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const navigate = useNavigate()

    const formatRuntime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60)

        const mins = minutes % 60

        return `${hours}h ${mins}m`
    }


    const getMovieDetail = useCallback(async () => {
        try {
            const data: IMovie = await fetchAPI(`movie/${id}`);

            setMovie(data);
        } catch (error) {
            console.error('Failed to fetch trending data:', error);

            setError(true)
        }
    }, [id]);


    const getMovieTrailer = useCallback(async () => {
        try {
            const data: IMovieTrailerResponse = await fetchAPI(`movie/${id}/videos?language=en`);

            data.results.forEach(trailer => {
                if (trailer.type.toLowerCase() === 'trailer') setTrailer(trailer.key)
            })
        } catch (error) {
            console.error('Failed to fetch trending data:', error);
            setError(true)
        }
    }, [id])


    const getMovieActers = useCallback(async () => {
        try {
            const data: IMovieActersResponse = await fetchAPI(`movie/${id}/credits`);

            setActers(data.cast)
        } catch (error) {
            console.error('Failed to fetch trending data:', error);
            setError(true)
        }
    }, [id])


    const formatNumber = (number: number): string => {
        return number?.toLocaleString('ru-RU')
    }


    const addToUser = async (url: string) => {
        if(!userLogin){
            navigate('/login')
        }
        
        const movieObj = {
            userId,
            id,
            poster_path: movie?.poster_path,
            title: movie?.title,
            release_date: movie?.release_date,
            overview: movie?.overview
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieObj)
        })

        const data = await res.json()

        alert(data.message)
    }


    useEffect(() => {
        try {
            getMovieDetail()
            getMovieTrailer()
            getMovieActers()
        } finally {
            setLoading(false)
        }
    }, [getMovieDetail, getMovieTrailer, getMovieActers])

    if (error) {
        return <Error />
    }

    if (movie === null) {
        return <Loader />
    }

    return (
        <div>
            {loading ? <Loader /> : null}
            <div className={style.wrapper}>
                <div className={style.container}>
                    <img className={style.movieDetailImage} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className={style.movieInfo}>
                        <h1>{movie.title}</h1>
                        <div className={style.detailsContainer}>
                            <p>{movie.release_date} / {movie.genres?.map(genre => genre.name).join(', ')} / {formatRuntime(movie.runtime)}</p>
                        </div>
                        <div>
                            <p>Рейтинг: {Math.round(movie.vote_average * 10)}%</p>
                            <p>Бюджет: {formatNumber(movie.budget)}$</p>
                            <p>Доход: {formatNumber(movie.revenue)}$</p>
                        </div>
                        <div className={style.addBtns}>
                            <button onClick={() => addToUser('/addToFavorites')}>Избранное</button>
                            <button onClick={() => addToUser('/addToinPlans')}>В Планах</button>
                        </div>
                        <div className={style.overview}>
                            <h3>Обзор</h3>
                            <p>{movie.tagline}</p>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
                <div className={style.movieTrailer}>
                    <iframe
                        width="800"
                        height="400"
                        src={`https://www.youtube.com/embed/${trailer}`}
                        title="Movie Trailer"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                </div>
                <MovieActors acters={acters} />
                <Recommendations propsId={id} />
            </div>
        </div>
    )
}

export default MovieDetail