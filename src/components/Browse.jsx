import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import VideoContainer from "./VideoContainer";
import MovieListContainer from "./MovieListContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();

    const searchedMovies = useSelector((store) => store.movies.searchedMovies);

    return (
        <div className="relative">
            <Header />
            {!searchedMovies ? (
                <>
                    <VideoContainer />
                    <MovieListContainer />
                </>
            ) : (
                <div className="absolute pt-16 bg-black min-h-[100vh] w-full">
                    <MovieList
                        title={"Search Result"}
                        movies={searchedMovies}
                        className="flex-wrap gap-y-8"
                    />
                </div>
            )}
        </div>
    );
};

export default Browse;
