import { ISearchMovies } from "../types/types"
import styles from '../styles/Search.module.css'
import formatDate from "../utils"
import { useNavigate } from "react-router-dom"

interface ISearchMoviesProps {
    movie: ISearchMovies
}

const SearchItem: React.FC<ISearchMoviesProps> = ({ movie }) => {
    const { id, poster_path, release_date, title, overview } = movie
    const navigate = useNavigate()

    const clickHandler = (id:number) => {
        navigate(`/movies/${id}`)
    }

    return (
        <div className={styles.movieWraper} onClick={() => clickHandler(id)}>
            <div className={styles.movieImgDiv}>
                <img className={styles.movieImg} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="poster" />
            </div>
            <div>
                <div className={styles.title}>
                    <h2>{title}</h2>
                    <span>{formatDate(release_date)}</span>
                </div>
                <p className={styles.overview}>
                {overview}
                </p>
            </div>
        </div>
    )
}

export default SearchItem