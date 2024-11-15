import { IMovieActers } from '../types/types'
import MovieActersItem from './MovieActersItem'

import styles from '../styles/MovieActers.module.css'

interface IMovieActersProps {
    acters: IMovieActers[]
}

const MovieActers:React.FC<IMovieActersProps> = ({acters}) => {
  return (
    <>
    <h2>В Ролях</h2>
    <div className={styles.acterContainer}>
      {acters.map(acter => 
        <MovieActersItem
        key={acter.id}
        id={acter.id}
        name={acter.name}
        character={acter.character}
        profile_path={acter.profile_path}
        gender={acter.gender}/>
      )}
    </div>
    </>
  )
}

export default MovieActers