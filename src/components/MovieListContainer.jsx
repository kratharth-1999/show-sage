import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MovieListContainer = () => {
    const movies = useSelector((store) => store.movies);

    return (
        <div className="bg-black absolute z-10">
            <div className="2xl:-mt-88 relative xl:-mt-52 lg:-mt-40 md:-mt-32 space-y-8">
                <MovieList
                    title={"Now Playing"}
                    movies={movies?.nowPlayingMovies}
                />
                <MovieList title={"Popular"} movies={movies?.popularMovies} />
                <MovieList
                    title={"Top Rated"}
                    movies={movies?.topRatedMovies}
                />
            </div>
        </div>
    );
};

export default MovieListContainer;
