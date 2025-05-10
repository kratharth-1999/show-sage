import React, { useRef } from "react";
import MovieCard from "./MovieCard";
const MovieList = ({ title, movies, className, showScroller = true }) => {
    const divRef = useRef(null);

    return (
        <section className="px-6">
            <h2 className="text-white text-md md:text-xl font-semibold mb-4">
                {title}
            </h2>
            {showScroller && (
                <>
                    <button
                        className="text-white text-7xl absolute left-8 z-20 h-[450px] cursor-pointer max-2xl:h-[300px]"
                        onClick={() =>
                            divRef.current.scrollBy({
                                left: -window.innerWidth,
                                behavior: "smooth",
                            })
                        }
                    >
                        &lt;
                    </button>
                    <button
                        className="text-white text-7xl absolute right-8 z-20 h-[450px] cursor-pointer max-2xl:h-[300px]"
                        onClick={() =>
                            divRef.current.scrollBy({
                                left: window.innerWidth,
                                behavior: "smooth",
                            })
                        }
                    >
                        &gt;
                    </button>
                </>
            )}
            <div
                className={`flex overflow-x-auto gap-x-4 scroll-smooth overflow-y-hidden no-scrollbar lg:gap-x-8 ${className}`}
                ref={divRef}
            >
                {movies?.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </section>
    );
};

export default MovieList;
