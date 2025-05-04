import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import VideoContainer from "./VideoContainer";
import MovieListContainer from "./MovieListContainer";

const Browse = () => {
    useNowPlayingMovies();

    return (
        <div className="relative">
            <Header />
            <VideoContainer />
            {/* <MovieListContainer /> */}
        </div>
    );
};

export default Browse;
