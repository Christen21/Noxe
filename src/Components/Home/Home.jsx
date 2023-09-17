import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

  const [movies, setmovies] = useState([]);
  const [tvs, settvs] = useState([]);
  const [people, setpeople] = useState([]);
  const [isLoading, setisLoading] = useState(false)

  async function getTrending(mediaItem , callback){
    setisLoading(true);
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaItem}/week?api_key=b77db6299478fa81a628b9beea3d0c9d`);
    callback(data.results);
    setisLoading(false);
    console.log(data.results);
  }

  useEffect(()=>{
    getTrending('movie' , setmovies);
    getTrending('tv' , settvs);
    getTrending('person' , setpeople);
  } , []);

  return <>
    {isLoading ?  <div className='d-flex vh-100 justify-content-center align-items-center'><i className="fa-solid fa-spinner fa-spin text-secondary fa-8x"></i></div> : null}

    <div className="row mt-4">

      <div className="col-md-4 d-flex flex-column justify-content-center">
        <div className="border w-25 my-4 ms-5"></div>
        <h2 className='text-white ps-5'>Trending Movies Right Now</h2>
        <p className='text-secondary ps-5'>Top Trending Movies By Week</p>
        <div className="border w-75 mt-4 ms-5"></div>
      </div>

      {movies.slice(0,10).map( (movie) => 
        <div className='col-md-2 mt-5' key={movie.id}>
          <Link className='text-decoration-none' to={`/ItemDetails/${movie.id}/${movie.media_type}`}>
            <div className='position-relative'>
              <img src={'https://image.tmdb.org/t/p/w500'+ movie.poster_path} className='w-100' alt=''/>
              <h2 className='text-secondary h5 pt-3'>{movie.title}</h2>
              <div className='position-absolute top-0 end-0 py-1 px-2 bg-primary text-white'>{movie.vote_average.toFixed(1)}</div>
            </div>
          </Link>
        </div>
     )}

    </div>

    <div className="row mt-4">

      <div className="col-md-4 d-flex flex-column justify-content-center">
        <div className="border w-25 my-4 ms-5"></div>
        <h2 className='text-white ps-5'>Trending TV Right Now</h2>
        <p className='text-secondary ps-5'>Top Trending TV By Week</p>
        <div className="border w-75 mt-4 ms-5"></div>
      </div>

      {tvs.slice(0,10).map( (tv) => 
        <div className='col-md-2 mt-5' key={tv.id}>
          <Link className='text-decoration-none' to={`/ItemDetails/${tv.id}/${tv.media_type}`}>
          <div className='position-relative'>
            <img src={'https://image.tmdb.org/t/p/w500'+ tv.poster_path} className='w-100'/>
            <h2 className='text-secondary h5 pt-3'>{tv.name}</h2>
            <div className='position-absolute top-0 end-0 py-1 px-2 bg-primary text-white'>{tv.vote_average.toFixed(1)}</div>
          </div>
          </Link>
        </div>
     )}

    </div>

    <div className="row mt-4">

      <div className="col-md-4 d-flex flex-column justify-content-center">
        <div className="border w-25 my-4 ms-5"></div>
        <h2 className='text-white ps-5'>Trending people Right Now</h2>
        <p className='text-secondary ps-5'>Top Trending people By Week</p>
        <div className="border w-75 mt-4 ms-5"></div>
      </div>

      {people.slice(0,10).map( (person) => 
        <div className='col-md-2 mt-5' key={person.id}>
          <Link className='text-decoration-none' to={`/ItemDetails/${person.id}/${person.media_type}`}>
          <div className='position-relative'>
            <img src={'https://image.tmdb.org/t/p/w500'+ person.profile_path} className='w-100'/>
            <h2 className='text-secondary h5 pt-3'>{person.name}</h2>
            <div className='position-absolute top-0 end-0 py-1 px-2 bg-primary text-white'>{person.popularity.toFixed(1)}</div>
          </div>
          </Link>
        </div>
     )}

    </div>

  </>
}