import { useParams,useHistory } from "react-router-dom";
import Icon from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import {useState,useEffect}  from "react";

export function MovieDetails() {

  let { id } = useParams();
  let history = useHistory();

   let[currentMovie,setCurrentMovie] = useState([]);

  let refreshMovieList = () => {
    fetch("https://620e80fd585fbc3359e511d8.mockapi.io/movies/"+id)
    .then((data) => data.json())
    .then((mvs) => setCurrentMovie(mvs));
  }

  useEffect(refreshMovieList, []);


  let name = currentMovie.name, summary = currentMovie.summary, trailer = currentMovie.trailer;

  return (
    <div className="movie-details-container">
      <div className="back-button">
      <Icon color="primary" aria-label="Go back to movie lists">
               <ArrowBackIosNewRoundedIcon fontSize="large" onClick={() => history.goBack()}/>
      </Icon>
      </div>
      <iframe width="100%" height="550px" src={trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div className="movie-details-specs">
        <h2>{name}</h2>
        <p>{summary}</p>
      </div>
    </div>
  );
}
