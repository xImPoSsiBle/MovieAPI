import { useEffect, useState } from "react"

import styles from '../styles/Trend.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieItem from "./MovieItem"
import { IMediaItem } from "../types/types"
import { fetchAPI } from "../api/tmdb"
import Slider from "react-slick"


const Trend: React.FC = () => {
    const [trend, setTrend] = useState<IMediaItem[]>([])
    const [windowSize, seWindowSize] = useState<number>(window.innerWidth)
    const [slides, setSlides] = useState<number>(5)

    const getTrending = async () => {
        try {
            const data = await fetchAPI('/trending/all/day');

            setTrend(data.results);
        } catch (error) {
            console.error('Failed to fetch trending data:', error);
        }
    };

    useEffect(() => {
        getTrending()
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slides,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        className: styles.slider
    };

    useEffect(() => {
        const handleResize = () => {
            seWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if(windowSize < 1000) setSlides(3)
        
        if(windowSize < 800) setSlides(2)
            
    }, [windowSize])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
            <h1>В Тренде</h1>
            </div>
            <div className={styles.container}>
                <Slider {...settings}>
                    {trend.map(i =>
                        <MovieItem
                            key={i.id}
                            id={i.id}
                            poster_path={i.poster_path}
                            release_date={i.release_date}
                            title={i.title}
                            name={i.name}
                            first_air_date={i.first_air_date} />
                    )}
                </Slider>
            </div>
        </div>
    )
}

export default Trend