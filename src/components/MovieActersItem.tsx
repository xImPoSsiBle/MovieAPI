import { IMovieActers } from '../types/types'

import styles from '../styles/MovieActers.module.css'
import maleIcon from '../images/male-icon.png'
import femaleIcon from '../images/female-icon.png'


const MovieActersItem: React.FC<IMovieActers> = (props) => {
  const { name, character, profile_path, gender } = props

  const acterIcon = gender === 0 ? femaleIcon : maleIcon
  return (
    <div className={styles.card}>
      <div className={styles.acterIconDiv}>
        {profile_path ? <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt='actor' /> : <img src={acterIcon} alt='actor' />}
      </div>
      <div className={styles.acterInfo}>
        <p className={styles.name}>{name}</p>
        <p className={styles.character}>{character}</p>
      </div>
    </div>
  )
}

export default MovieActersItem