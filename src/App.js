import { useState,useEffect } from 'react'
import MovieCard from './MovieCard'
import "./App.css"
import SearchIcon from './search.svg'
const API_URL = 'http://www.omdbapi.com?apikey=4d8b67c0';



const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTermm, setSearchTerm] = useState('');

    useEffect(() =>{
        searchMovies('Spiderman');
    },[]);

    const searchMovies = async (title) => {
       try {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
       }catch(e){
        console.log("error",e);
       }

       
    }

    return(
        <div className="app">
            <h1>MovieMania</h1>

            <div className="search">
                <input 
                    placeholder="Search for Movies"
                    value={searchTermm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTermm)}
                />
            </div>

            {
                 movies?.length > 0
                    ?(
                        <div className="container">
                            {movies.map((movie)=>(
                                <MovieCard movie={movie}/>
                            ))}
                        </div>
                    ):(
                        <div className="empty">
                            <h2>No movies found</h2>
                         </div>
                    )
            }
            
        </div>
    );
};

export default App;