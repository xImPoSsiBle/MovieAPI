import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom"
import { fetchAPI } from "../api/tmdb";
import { ISearchMovies } from "../types/types";
import Error from "./Error";
import SearchItem from "./SearchItem";

import styles from '../styles/Search.module.css'
import InfiniteScroll from "react-infinite-scroll-component";

interface ISearchMoviesResponse {
    results: ISearchMovies[];
    total_pages: number;
}

const Search: React.FC = () => {
    const { value, genre } = useParams<string>()
    const [movies, setMovies] = useState<ISearchMovies[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [error, setError] = useState<boolean>(false)

    const getMovies = useCallback(async (pageNum: number) => {
        try {
            let url = genre ? `discover/movie?language=ru&with_genres=${genre}&page=${pageNum}` : `search/movie?query=${value}&language=ru&page=${pageNum}`

            const data: ISearchMoviesResponse = await fetchAPI(url);

            setMovies(movies => [...movies, ...data.results])
            setTotalPages(data.total_pages)
            console.log(data)
        } catch (error) {
            console.error('Failed to fetch trending data:', error);
            setError(true)
        }
    }, [value, genre]);

    const getMoreMovies = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1)
            getMovies(page + 1)
        }
    }

    useEffect(() => {
        setMovies([])
        getMovies(1)
    }, [getMovies])

    if (error) {
        return <Error />
    }

    return (
        <div className={styles.container}>
            <InfiniteScroll
                dataLength={movies.length}
                next={getMoreMovies}
                hasMore={page < totalPages}
                loader={<h4>Loading...</h4>}
                className={styles.movieScroll}>
                {movies.map((movie, index) =>
                    <SearchItem
                        key={movie.id - index}
                        movie={movie} />
                )}
            </InfiniteScroll>
        </div>
    )
}

export default Search