import { DisplayMovie } from "./DisplayMovie.js";
import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useState,useEffect} from "react";

export function MovieListsDisplay() {
  let history = useHistory();
  let[movieList,setMovieList] = useState([]);

  let refreshMovieList = () => {
    fetch("https://620e80fd585fbc3359e511d8.mockapi.io/movies")
    .then((data) => data.json())
    .then((mvs) => setMovieList(mvs));
  }

  useEffect(refreshMovieList, []);

  let deleteMovie = (id) => {
    fetch("https://620e80fd585fbc3359e511d8.mockapi.io/movies/"+id , {method: "DELETE"})
    .then((data) => data.json())
    .then((mvs) => refreshMovieList());
  };

  return (
    <div>
      <section className="movie-section">
        {movieList.map((movie, index) => <DisplayMovie key={index}
          name={movie.name} poster={movie.poster}
          alt_name={movie.alt_name} year={movie.year}
          rating={movie.rating}
          summary={movie.summary}
          mid={movie.id}
          id={index}

          deleteButton={<IconButton aria-label="Delete movie" onClick={() => deleteMovie(movie.id)
          }><DeleteIcon color="error" fontSize="small" /></IconButton>}

          editButton={<IconButton aria-label="edit movie">
            <EditIcon color="primary" fontSize="small" onClick={() => history.push("/movies/edit/"+movie.id)} />
          </IconButton>} />)}
      </section>
    </div>
  );
}

