import React, { useEffect } from "react";
import Header from "./Header";
import { useGet } from "../hooks/useGet";
import { TMDB_MOVIE_BASE_URL } from "../utils/constants";

const Browse = () => {
    const { stateOfGetRequest, getData } = useGet();

    useEffect(() => {
        getData(TMDB_MOVIE_BASE_URL + "/now_playing?page=1");
    }, []);

    useEffect(() => {
        if (!stateOfGetRequest.data) return;
        console.log(stateOfGetRequest.data);
    }, [stateOfGetRequest.data]);

    return (
        <div>
            <Header />
        </div>
    );
};

export default Browse;
