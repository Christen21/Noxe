import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ItemDetails() {

  let {id,mediaType} = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setisLoading] = useState(false)

  async function getDetails(id , mediaType) {
    setisLoading(true);
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=b77db6299478fa81a628b9beea3d0c9d`);
    setDetails(data);
    setisLoading(false);
    console.log(data);
  }

  useEffect(()=>{
    getDetails(id , mediaType)
  } , []);

  return <>
      {isLoading ?  <div className='d-flex vh-100 justify-content-center align-items-center'><i className="fa-solid fa-spinner fa-spin text-secondary fa-8x"></i></div> : null}

      <div className="row mt-4">
        <div className="col-md-4">
          {details.poster_path ? <img src={'https://image.tmdb.org/t/p/w500'+ details.poster_path} className='w-100'/>:
          <img src={'https://image.tmdb.org/t/p/w500'+ details.profile_path} className='w-100'/>}
        </div>

        <div className="col-md-8 d-flex flex-column justify-content-center">
          {details.title? <h3 className='text-primary'>{details.title}</h3> : <h3 className='text-primary'>{details.name}</h3>}

          {details.overview?<h5 className='text-secondary pt-4'>{details.overview}</h5>:<h5 className='text-secondary pt-4'>{details.biography}</h5>}     
            {details.vote_average? <h4 className='text-white pt-3'>Vote Averege : <span className='text-primary'> {details.vote_average}</span></h4> : ""}
            {details.vote_count? <h4 className='text-white pt-3'>Vote Count : <span className='text-primary'> {details.vote_count}</span></h4> : ""}
            {details.popularity? <h4 className='text-white pt-3'>Popularity : <span className='text-primary'> {details.popularity}</span></h4> : ""}
          
        </div>
      </div>
  </>
}
