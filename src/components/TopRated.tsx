import { useEffect, useState } from "react"
import MovieItem from "./MovieItem";
import { IMediaItem } from "../types/types";

import styles from '../styles/TopRated.module.css'
import { fetchAPI } from "../api/tmdb";

interface ITopRatedResponce {
    results: IMediaItem[]
}

const TopRated: React.FC = () => {
    const [topRated, setTopRated] = useState<IMediaItem[]>([])

    const getTopRated = async () => {
        const data:ITopRatedResponce = await fetchAPI('movie/top_rated')

        setTopRated(data.results)
    }

    useEffect(() => {
        getTopRated()
    }, [])

    return (
        <div className={styles.wrapper}>
            <h2>Топ фильмы</h2>
            <div className={styles.container}>
                {topRated?.map(i =>
                    <MovieItem
                        key={i.id}
                        id={i.id}
                        poster_path={i.poster_path}
                        release_date={i.release_date}
                        title={i.title}
                        name={i.name}
                        first_air_date={i.first_air_date} />
                )}
            </div>
        </div>
    )
}

export default TopRated