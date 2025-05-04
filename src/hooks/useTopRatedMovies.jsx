import useGet from "../hooks/useGet";
import { TMDB_MOVIE_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../store/slices/moviesSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useTopRatedMovies = () => {
    const { stateOfGetRequest: topRatedMoviesRequest, getData } = useGet();
    const dispatch = useDispatch();

    useEffect(() => {
        getData(TMDB_MOVIE_BASE_URL + "/top_rated");
    }, []);

    useEffect(() => {
        if (!topRatedMoviesRequest.data) return;
        dispatch(addTopRatedMovies(topRatedMoviesRequest.data.results));
    }, [topRatedMoviesRequest.data]);

    useEffect(() => {
        if (!topRatedMoviesRequest.getDataError) return;
        toast.error(topRatedMoviesRequest.getDataError);
    }, [topRatedMoviesRequest.getDataError]);

    return topRatedMoviesRequest;
};

export default useTopRatedMovies;
