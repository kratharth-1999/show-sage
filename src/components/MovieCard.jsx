import React from "react";
import { TMDB_IMAGES_CDN } from "../utils/constants";

const MovieCard = ({ movie }) => {
    if (!movie?.poster_path) return null;

    return (
        <div className="shrink-0 rounded-md overflow-hidden shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105">
            <img
                src={TMDB_IMAGES_CDN + movie.poster_path}
                alt={movie.original_title + " Poster"}
                className="w-full object-fill max-2xl:aspect-square"
            />
        </div>
    );
};

export default MovieCard;
