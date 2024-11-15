import { useEffect, useState } from 'react'
import styles from '../../styles/ProfilePages.module.css'
import { IProfilePages } from '../../types/types'
import SearchItem from '../SearchItem'

interface IFavoriteProps {
    userId: string
}

const Favorites: React.FC<IFavoriteProps> = ({ userId }) => {
    const [favorites, setFavorites] = useState<IProfilePages[]>([])

    const getUserFavorites = async () => {
        const res = await fetch('/getUserFavorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId})
        })

        const data = await res.json()

        setFavorites(data.results)
    }

    useEffect(() => {
        getUserFavorites()
    }, [])

    return (
        <div className={styles.container}>
            {favorites.map((movie, index) =>
                    <SearchItem
                        key={movie.id - index}
                        movie={movie} />
                )}
        </div>
    )
}

export default Favorites