import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useHistory, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {useFormik} from "formik";

let formValidationSchema = yup.object({
  name:yup.string().required(),
  posterUrl:yup.string().required().min(4),
  year:yup.string().required(),
  rating:yup.number().required().lessThan(10).positive(),
  summary:yup.string().required().min(20),
  altName:yup.string().required(),
  trailerLink:yup.string().required().min(4),
})

export function EditMovie() {

  let { idx } = useParams();

  let [editCurrentMovie, SetEditCurrentMovie] = useState(null);

  useEffect(() => {
    fetch("https://620e80fd585fbc3359e511d8.mockapi.io/movies/"+idx)
      .then((data) => data.json())
      .then((mv) => SetEditCurrentMovie(mv));
  }, []);
 
   console.log("edit movie " +editCurrentMovie);
  return  editCurrentMovie ? <EditMovieForm editCurrentMovie={editCurrentMovie}  /> : "";
  
}

function EditMovieForm({editCurrentMovie}){
  let [poster, setPoster] = useState(editCurrentMovie.poster);
  let [alt_name, setAltname] = useState(editCurrentMovie.alt_name);
  let [year, setYear] = useState(editCurrentMovie.year);
  let [name, setName] = useState(editCurrentMovie.name);
  let [rating, setRating] = useState(editCurrentMovie.rating);
  let [summary, setSummary] = useState(editCurrentMovie.summary);
  let [trailer, setTrailer] = useState(editCurrentMovie.trailer);
  let history = useHistory();

  let formik = useFormik({
    initialValues: {name:"",posterUrl:"",year:"",rating:"",summary:"",altName:"",trailerLink:""},
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      console.log("onSubmit" ,values);
    }
  })

    return(
        <div className="Editmovie-form">
        <TextField id="name" name="name" value={name} label="Name" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.name && formik.touched.name ? formik.errors.name : ""}
        <TextField id="posterUrl" name="posterUrl" value={poster} label="Poster Url" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.posterUrl && formik.touched.posterUrl ? formik.errors.posterUrl : ""}
        <TextField id="year" name="year" value={year} label="Year" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.year && formik.touched.year ? formik.errors.year : ""}
        <TextField id="rating" name="rating" value={rating} label="Rating" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.rating && formik.touched.rating ? formik.errors.rating : ""}
        <TextField id="summary" name="summary" value={summary} label="Summary" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.setSummary && formik.touched.setSummary ? formik.errors.setSummary : ""}
        <TextField id="altName" name="altName" value={alt_name} label="Alt Name" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.altName && formik.touched.altName ? formik.errors.altName : ""}
        <TextField id="trailerLink" name="trailerLink" value={trailer} label="Trailer link" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.trailerLink && formik.touched.trailerLink ? formik.errors.trailerLink : ""}
        <div className="EditForm-cancel-button">
          <Button type="submit" variant="outlined"
            onClick={() => {
              let updatedMovie = {
                poster: poster,
                alt_name: alt_name,
                year: year,
                name: name,
                rating: rating,
                summary: summary,
                trailer: trailer
              };
  
              fetch("https://620e80fd585fbc3359e511d8.mockapi.io/movies/"+editCurrentMovie.id, {
                method: "PUT",
                body: JSON.stringify(updatedMovie),
                headers: { "Content-type": "application/json" },
              }).then(() => history.push("/movies"));
            }}>Update</Button>
  
          <Button variant="outlined"
            onClick={() => { history.push("/movies"); }}>Cancel</Button>
        </div>
      </div>
    );
}