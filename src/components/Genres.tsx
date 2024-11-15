import { IGenres } from '../types/types'
import styles from '../styles/Genres.module.css'
import { useNavigate } from 'react-router-dom'

interface IGenresProps {
    genres: IGenres[]
}

const Genres: React.FC<IGenresProps> = ({ genres }) => {
    const navigate = useNavigate()

    const upperFirstLetter = (name: string): string => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    const findByGenre = (id:number) => {
        navigate(`/search/genre/${id}`)
    }

    return (
        <div className={styles.genresDiv}>
            {genres.map(genre => {
                return (
                    <div key={genre.id} className={styles.genre} onClick={() => findByGenre(genre.id)}>
                        {upperFirstLetter(genre.name)}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres