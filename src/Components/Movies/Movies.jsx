import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {

  const [movies, setmovies] = useState([]);
  const [isLoading, setisLoading] = useState(false)

  async function getTrending(){
    setisLoading(true);
    let {data} = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b77db6299478fa81a628b9beea3d0c9d');
    setmovies(data.results);
    setisLoading(false);
    console.log(data.results);
  }

  useEffect(()=>{
    getTrending();
  } , []);

  return <>
      {isLoading ?  <div className='d-flex vh-100 justify-content-center align-items-center'><i className="fa-solid fa-spinner fa-spin text-secondary fa-8x"></i></div> : null}

      <div className="row">
      {movies.map( (movie) => 
        <div className='col-md-2 mt-5' key={movie.id}>
          <Link className='text-decoration-none' to={`/ItemDetails/${movie.id}/movie`}>
            <div className='position-relative'>
              <img src={'https://image.tmdb.org/t/p/w500'+ movie.poster_path} className='w-100' alt=''/>
              <h2 className='text-secondary h5 pt-3'>{movie.title}</h2>
              <div className='position-absolute top-0 end-0 py-1 px-2 bg-primary text-white'>{movie.vote_average.toFixed(1)}</div>
            </div>
          </Link>
        </div>
     )}
      </div>
  </>
}
