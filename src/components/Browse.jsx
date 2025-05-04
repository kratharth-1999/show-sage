import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import VideoContainer from "./VideoContainer";
import MovieListContainer from "./MovieListContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();

    return (
        <div className="relative">
            <Header />
            <VideoContainer />
            <MovieListContainer />
        </div>
    );
};

export default Browse;
