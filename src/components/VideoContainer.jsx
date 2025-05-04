import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const VideoContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movies) return;

    const movieToBeDisplayed =
        movies[Math.floor(Math.random() * movies.length)];

    const { original_title, overview, id } = movieToBeDisplayed;

    return (
        <div className="relative aspect-video">
            <VideoBackground movieId={id} />
            <div className="absolute left-8 text-white p-4 bg-transparent bg-opacity-50 rounded-lg top-[50%]">
                <VideoTitle title={original_title} overview={overview} />
            </div>
        </div>
    );
};

export default VideoContainer;
