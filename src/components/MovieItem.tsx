import { IMediaItem } from '../types/types'

import styles from '../styles/MovieItem.module.css'
import { useNavigate } from "react-router-dom"
import formatDate from '../utils'


const MovieItem: React.FC<IMediaItem> = (props) => {
    const { id, poster_path, title, name, first_air_date, release_date } = props

    const navigate = useNavigate()

    return (
        <div className={styles.post} onClick={() => navigate(`/movies/${id}`)}>
            <img
                src={`https://image.tmdb.org/t/p/w1280/${poster_path}`}
                alt="poster"
                className={styles.image}
            />
            <div className={styles.title}>
                <span>
                    <b>
                        {title || name}
                    </b>
                </span>
                <span>
                    {formatDate(first_air_date || release_date)}
                </span>
            </div>
        </div>
    )
}

export default MovieItem