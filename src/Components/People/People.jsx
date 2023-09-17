import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function People() {
  const [people, setpeople] = useState([]);
  const [isLoading, setisLoading] = useState(false)

  async function getTrending(){
    setisLoading(true);
    let {data} = await axios.get('https://api.themoviedb.org/3/person/popular?api_key=b77db6299478fa81a628b9beea3d0c9d');
    setpeople(data.results);
    setisLoading(false);
    console.log(data.results);
  }

  useEffect(()=>{
    getTrending();
  } , []);

  return <>
      {isLoading ?  <div className='d-flex vh-100 justify-content-center align-items-center'><i className="fa-solid fa-spinner fa-spin text-secondary fa-8x"></i></div> : null}

      <div className="row">
        {people.map( (person) => 
          <div className='col-md-2 mt-5' key={person.id}>
            <Link className='text-decoration-none' to={`/ItemDetails/${person.id}/person`}>
              <div className='position-relative'>
                <img src={'https://image.tmdb.org/t/p/w500'+ person.profile_path} className='w-100' alt=''/>
                <h2 className='text-secondary h5 pt-3'>{person.name}</h2>
                <div className='position-absolute top-0 end-0 py-1 px-2 bg-primary text-white'>{person.popularity.toFixed(1)}</div>
              </div>
            </Link>
          </div>
      )}
      </div>
  </>
}