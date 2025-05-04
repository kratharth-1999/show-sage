import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
    return (
        <section className="px-6">
            <h2 className="text-white text-md md:text-xl font-semibold mb-4">
                {title}
            </h2>
            <div className="flex overflow-x-auto gap-x-4 scroll-smooth overflow-y-hidden no-scrollbar 2xl:gap-x-12 lg:gap-x-8">
                {movies?.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </section>
    );
};

export default MovieList;
