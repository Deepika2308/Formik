import {useState} from "react";
import "./style.css";
import Button from '@mui/material/Button';
import {Switch,Route,Redirect,useHistory} from "react-router-dom";
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ColorBox } from "./ColorBox";
import { MovieDetails } from "./MovieDetails";
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { MovieListsDisplay } from "./MovieListsDisplay";
import { EditMovie } from "./EditMovie";
import { BasicForm } from "./BasicForm";
import { AddMovie } from "./AddMovie";


export default function App() {
  // let[movieList,setMovieList] = useState([]);

  let [mode,setMode] = useState("light");
  let history = useHistory();

  const modeTheme = createTheme({
   palette: {
    mode: mode,
   },
  });

  return (
    <ThemeProvider theme={modeTheme}>
      <Paper sx={{borderRadius:"0px", minHeight: "100vh"}} elevation={5}>
     <div className="App">
      <AppBar position="static">
        <Toolbar>
         <div className="appbar-menus">
         <Button color="inherit" onClick={() => history.push("/")}>Home</Button>
          <Button color="inherit" onClick={() => history.push("/color-game")}>Color game</Button>
          <Button color="inherit" onClick={() => history.push("/movies")}>Movies list</Button>
          <Button color="inherit" onClick={() => history.push("/movies/add")}>Add new movie</Button>
         </div> 
         <div className="switch-mode-icon">
         <IconButton aria-label="Details icon" >
              {modeTheme.palette.mode === "dark" ? <Brightness7Icon onClick={() => setMode("light")} /> : <Brightness4Icon onClick={() => setMode("dark")} />}
         </IconButton>
         </div>
        </Toolbar>
      </AppBar> 
      
      <Switch>
        <Route path="/color-game">
          <ColorBox />
        </Route>
        <Route exact path="/movies">
          <MovieListsDisplay  />
        </Route>
        <Route path="/films">
          <Redirect to="/movies"></Redirect>
        </Route>
        <Route exact path="/movies/add">
          <AddMovie />
        </Route>
        <Route path="/movies/edit/:idx">
          <EditMovie />
        </Route>
        <Route path="/movies/:id">
          <MovieDetails 
          />
        </Route>
        <Route exact path="/">
          <h2 className="home-content">🎞 Welcome to Movie App 🎞</h2>
        </Route>
        <Route exact path="/basic-form">
          <BasicForm />
        </Route>
        <Route path="**">
          <PageNotFound />
        </Route>
      </Switch>  
       </div>
      </Paper> 
    </ThemeProvider>
    
 );
}

export function Counter(){
  let [like,setLike] = useState(0);
  let [dislike,setDislike] = useState(0);
  return(
     <div className="like-button">
       <Button variant="text" color="success" size="medium" onClick={() => setLike(like+1)}>👍    {like}</Button>
       <Button variant="text" color="error" size="medium" onClick={() => setDislike(dislike+1)}>👎    {dislike}</Button>
     </div>
  );
}


function PageNotFound(){
  return(
    <div className="pageNotFound">
     <h2>Page not found !!</h2>
     <img src="https://i.pinimg.com/originals/b6/a9/c9/b6a9c9aa576bb66170b25a6cce9bbcfe.jpg" alt="404 page not found"></img>
     </div>
  );
}


