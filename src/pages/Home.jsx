import React from 'react'
import LargeBanner from '../components/largeBanner'
import PopularMovies from '../components/popularMovies'
import Movies from '../components/movies'

export default function Home() {
  return (
    <div className='cont'>
      <LargeBanner />
      <PopularMovies />
      <Movies />
     
      
    </div>
  )
}
