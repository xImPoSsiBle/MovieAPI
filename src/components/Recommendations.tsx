import { useEffect, useState, useCallback } from 'react'
import { fetchAPI } from '../api/tmdb';
import { IMediaItem } from '../types/types';

import styles from '../styles/Recommendations.module.css'
import formatDate from '../utils';
import { useNavigate } from 'react-router-dom';

interface IRecommendationsProps {
    propsId: string | undefined;
}

const Recommendations: React.FC<IRecommendationsProps> = ({ propsId }) => {
    const [id, setId] = useState<string | undefined>(propsId)
    const [recommendations, setRecommendations] = useState<IMediaItem[]>([])

    const navigate = useNavigate()

    const getReccomendations = useCallback(async () => {
        try {
            const data = await fetchAPI(`movie/${id}/recommendations`);

            setRecommendations(data.results)
            
            console.log(data)
        } catch (error) {
            console.error('Failed to fetch trending data:', error);
        }
    }, [id])


    useEffect(() => {
        setId(propsId)
        getReccomendations()
    }, [propsId, getReccomendations])

    return (
        <div>
            <h2>Рекомендации</h2>
            <div className={styles.container}>
                {recommendations.map((movie) => {
                    return (
                        <div key={movie.id} className={styles.post} onClick={() => navigate(`/movies/${movie.id}`)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                                alt="poster"
                                className={styles.image}
                            />
                            <div className={styles.title}>
                                <span>
                                    <b>
                                        {movie.title || movie.name}
                                    </b>
                                </span>
                                <span>
                                    {formatDate(movie.first_air_date || movie.release_date)}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Recommendations