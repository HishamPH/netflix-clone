import React, { useEffect, useState } from 'react'
import '../styles/Player.css'
import back_arrow from '../assets/back_arrow_icon.png'
import { useParams,Link, useNavigate } from 'react-router-dom'
const Player = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [movieData,setMovieData]=useState({
    name:'',
    key:'',
    published_at:'',
    type:''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWY2M2FlNTM5ZDhiZTMwZGYzZDBmODc5MWRlNDc1MSIsInN1YiI6IjY2NjdmZWQ2YzIxY2RlMTE2ZTdjNWI4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kIVjmT0UEa552Q3GBm6_PDZeV53Aifo-cfnCvdyaRTs'
    }
  };
  
  

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setMovieData(response.results[0]))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>

        <img src={back_arrow} alt="" onClick={()=>{navigate(-2)}}/>

      
      <iframe src={`https://www.youtube.com/embed/${movieData.key}`} width='90%' height='90%'
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{movieData.published_at.slice(0,10)}</p>
        <p>{movieData.name}</p>
        <p>{movieData.type}</p>
      </div>
    </div>
  )
}

export default Player
