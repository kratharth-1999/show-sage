import React from "react";
import useMovieVideos from "../hooks/useMovieVideos";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
    useMovieVideos(movieId);
    const trailer = useSelector((store) => store.movies.trailerVideo);
    return (
        <iframe
            className="w-full absolute top-0 left-0 pointer-events-none object-cover h-full"
            src={`https://www.youtube.com/embed/${trailer?.key}?controls=0&autoplay=1&mute=1&showinfo=0&modestbranding=1&loop=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
    );
};

export default VideoBackground;
