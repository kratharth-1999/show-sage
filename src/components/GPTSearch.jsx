import React, { useEffect, useState } from "react";
import useDebounceFetch from "../hooks/useDebounce";
import ai from "../utils/gemini";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addSearchedMovies } from "../store/slices/moviesSlice";
import useSearchMovie from "../hooks/useSearchMovie";
import Loader from "./Loader";
import { IconX } from "@tabler/icons-react";

const GPTSearch = () => {
    const [gptResponse, setGPTResponse] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchingMovies, setSearchingMovies] = useState(false);
    const dispatch = useDispatch();
    const { searchMovie } = useSearchMovie();

    const fetchGPTResponse = async (signal, query) => {
        setSearchingMovies(true);
        setGPTResponse("");
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: ` Act like a movie recommendation system. Generate a list of movie names (Maximum: 5) for the given input: INPUT=${query}. If you think the query represents a plot then interpret that plot and return movies that fit the description of the plot. If the query is a movie name then return that movie name. The response must be strictly a comma seperated list of movie names, with no other text preceding or following the list.`,
            config: {
                abortSignal: signal,
            },
        });
        if (!response || !response.text) {
            setSearchingMovies(false);
            return;
        }
        setGPTResponse(response.text);
    };

    const handleSearch = useDebounceFetch(fetchGPTResponse, 1000);

    useEffect(() => {
        if (!searchValue || !searchValue.length) {
            dispatch(addSearchedMovies(null));
            return;
        }
        handleSearch(searchValue);
    }, [searchValue]);

    useEffect(() => {
        const fetchMoviesFromResponse = async (moviePromises) => {
            try {
                const allMovies = await Promise.all(moviePromises);
                const allMoviesFlat = allMovies.flat();
                const seenMovieIds = new Set();
                const uniqueMovies = [];
                for (const movie of allMoviesFlat) {
                    if (!seenMovieIds.has(movie.id)) {
                        uniqueMovies.push(movie);
                        seenMovieIds.add(movie.id);
                    }
                }
                dispatch(addSearchedMovies(uniqueMovies));
            } catch (error) {
                toast.error("Could not fetch movie from DB");
            } finally {
                setSearchingMovies(false);
            }
        };
        if (!gptResponse) return;
        const moviePromises = gptResponse.split(",").map((movie) => {
            return searchMovie(movie.trim());
        });
        fetchMoviesFromResponse(moviePromises);
    }, [gptResponse]);

    return (
        <div className="relative flex-1">
            <input
                type="text"
                placeholder="GPT Search..."
                value={searchValue}
                className="w-full md:focus:w-64 lg:focus:w-96 md:w-32 lg:w-48 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out pr-10 group-focus:flex-1"
                onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchingMovies && (
                <Loader fill="red" inline={true} right="1rem" />
            )}
            {searchValue.length > 0 && !searchingMovies && (
                <button
                    className="text-white cursor-pointer relative -left-8 top-1"
                    onClick={() => setSearchValue("")}
                >
                    <IconX stroke={2} size={20} />
                </button>
            )}
        </div>
    );
};

export default GPTSearch;
