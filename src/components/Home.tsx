import { useEffect, useState } from 'react'
import Trend from './Trend'
import { fetchAPI } from '../api/tmdb'
import Genres from './Genres'
import { IGenres } from '../types/types'
import TopRated from './TopRated'
import Footer from './Footer'

const Home: React.FC = () => {
  const [genres, setGenres] = useState<IGenres[]>([])

  const getGenres = async () => {
    try {
      const data = await fetchAPI('genre/movie/list')

      setGenres(data.genres)
    } catch (error) {
      console.log('Ошибка', error)
    }
  }

  useEffect(() => {
    getGenres()
  }, [])

  return (
    <div>
      <Trend />
      <Genres genres={genres} />
      <TopRated/>
      <Footer/>
    </div>
  )
}

export default Home