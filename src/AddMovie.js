import { useState } from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import * as yup from "yup";

let formValidationSchema = yup.object({
  name:yup.string().required(),
  posterUrl:yup.string().required().min(4),
  year:yup.string().required(),
  rating:yup.number().required().lessThan(10).positive(),
  summary:yup.string().required().min(20),
  altName:yup.string().required(),
  trailerLink:yup.string().required().min(4),
})

export function AddMovie() {
  let [name, setName] = useState();
  let [poster, setPoster] = useState();
  let [year, setYear] = useState();
  let [rating, setRating] = useState();
  let [summary, setSummary] = useState();
  let [alt_name, setAltname] = useState();
  let [trailer, setTrailer] = useState();
  let history = useHistory();


  let formik = useFormik({
    initialValues: {name:"",posterUrl:"",year:"",rating:"",summary:"",altName:"",trailerLink:""},
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      console.log("onSubmit" ,values);
    }
  })

  return (
    <form className="Addmovie-form" onSubmit={formik.handleSubmit}>
      <TextField id="name" label="Name" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange}  /> {formik.errors.name && formik.touched.name ? formik.errors.name : ""}
      <TextField id="posterUrl" label="Poster Url" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.posterUrl && formik.touched.posterUrl ? formik.errors.posterUrl : ""}
      <TextField id="year" label="Year" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.year && formik.touched.year ? formik.errors.year : ""}
      <TextField id="rating" label="Rating" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.rating && formik.touched.rating ? formik.errors.rating : ""}
      <TextField id="summary" label="Summary" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.summary && formik.touched.summary ? formik.errors.summary : ""}
      <TextField id="altName" label="Alt Name" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.altName && formik.touched.altName ? formik.errors.altName : ""}
      <TextField id="trailerLink" label="Trailer link" variant="outlined" onBlur={formik.handleBlur} onChange={formik.handleChange} /> {formik.errors.trailerLink && formik.touched.trailerLink ? formik.errors.trailerLink : ""}

      <div className="editmovie-cancel-button" >
        <Button variant="outlined"
          onClick={() => {
            let newMovie = {
              poster: poster,
              name: name,
              alt_name: alt_name,
              year: year,
              rating: rating,
              summary: summary,
              trailer: trailer,
            };
            console.log("json stringify " + JSON.stringify(newMovie));
            fetch("https://620e80fd585fbc3359e511d8.mockapi.io/movies", {
              method: "POST",
              body: JSON.stringify(newMovie),
              headers: { "Content-type": "application/json", },
            }).then(() => history.push("/movies"));
          }}>Add Movie</Button>

        <Button type="submit" variant="outlined"
          onClick={() => { history.push("/movies"); }}>Cancel</Button>
      </div>
    </form>
  );
}
