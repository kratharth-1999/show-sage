import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const VideoContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    const trailerMovieId = useSelector((store) => store.movies.trailerMovieId);
    if (!movies) return;

    let movieToBeDisplayed = null;
    if (trailerMovieId) {
        movieToBeDisplayed = movies.find((movie) => movie.id == trailerMovieId);
    } else {
        movieToBeDisplayed = movies[Math.floor(Math.random() * movies.length)];
    }

    const { original_title, overview, id } = movieToBeDisplayed;

    return (
        <div className="relative aspect-video">
            <VideoBackground movieId={id} />
            <div className="text-white bg-transparent bg-opacity-50 absolute w-full h-full content-center pl-8">
                <VideoTitle title={original_title} overview={overview} />
            </div>
        </div>
    );
};

export default VideoContainer;
