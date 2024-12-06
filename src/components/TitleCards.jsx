import {useEffect, useRef, useState} from 'react'
import '../styles/TitleCards.css';
import { Link } from 'react-router-dom';
import cards_data from '../assets/cards/Cards_data'
const TitleCards = ({title,category}) => {
  const [movieData,setMovieData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWY2M2FlNTM5ZDhiZTMwZGYzZDBmODc5MWRlNDc1MSIsInN1YiI6IjY2NjdmZWQ2YzIxY2RlMTE2ZTdjNWI4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kIVjmT0UEa552Q3GBm6_PDZeV53Aifo-cfnCvdyaRTs'
    }
  };
  
  

  const handleWheel = (e)=>{
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setMovieData(response.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])
  return (
    <div className='titlecards'>
      <h2>{title?title:'Now Playing'}</h2>
      <div className="card-list" ref={cardsRef}>
        {movieData.map((card,index)=>{
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="" />
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards