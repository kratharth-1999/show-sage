import React, { useEffect, useState, useRef } from "react";
import useDebounceFetch from "../hooks/useDebounce";
import ai from "../utils/gemini";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addSearchedMovies } from "../store/slices/moviesSlice";
import useSearchMovie from "../hooks/useSearchMovie";

const GPTSearch = () => {
    const [gptResponse, setGPTResponse] = useState("");
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const { searchMovie } = useSearchMovie();

    const fetchGPTResponse = async (signal, query) => {
        if (!query || !query.length) return;
        setGPTResponse("");
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: ` Act like a movie recommendation system. Generate a list of movie names (Maximum: 5) with the following query: ${query}.\
                        The response must be strictly a comma seperated list of movie names, with no other text preceding or following the list`,
            config: {
                abortSignal: signal,
            },
        });
        if (!response || !response.text) return;
        setGPTResponse(response.text);
    };

    const handleSearch = useDebounceFetch(fetchGPTResponse, 500);

    useEffect(() => {
        const fetchMoviesFromResponse = async (moviePromises) => {
            try {
                const allMovies = await Promise.all(moviePromises);
                const allMoviesFlat = allMovies.flat();
                const newMovies = [];
                allMoviesFlat.map((movie, index) => {
                    if (!newMovies.includes(movie.id)) {
                        newMovies.push(movie.id);
                    } else {
                        allMoviesFlat.splice(index, 1);
                    }
                });
                dispatch(addSearchedMovies(allMoviesFlat));
            } catch (error) {
                toast.error("Could not fetch movie from DB");
            }
        };
        if (!gptResponse) return;
        const moviePromises = gptResponse.split(",").map((movie) => {
            return searchMovie(movie.trim());
        });
        fetchMoviesFromResponse(moviePromises);
    }, [gptResponse]);

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="GPT Search..."
                ref={inputRef}
                className="w-16 focus:w-32 md:focus:w-64 lg:focus:w-96 md:w-32 lg:w-48 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out pr-10"
                onChange={(e) => handleSearch(inputRef.current.value)}
            />
            {inputRef.current && inputRef.current.length && (
                <button
                    className="text-white cursor-pointer relative -left-8 *:"
                    onClick={() => {
                        inputRef.current.value = null;
                        handleSearch();
                    }}
                >
                    x
                </button>
            )}
        </div>
    );
};

export default GPTSearch;
