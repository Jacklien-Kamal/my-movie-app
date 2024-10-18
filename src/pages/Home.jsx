import React from 'react'
import LargeBanner from '../components/largeBanner'
import PopularMovies from '../components/popularMovies'
import MoviesByCategory from '../components/moviesByCategory'

export default function Home() {
  return (
    <div className='cont'>
      <LargeBanner />
      <PopularMovies />
      <MoviesByCategory />
     
      
    </div>
  )
}
