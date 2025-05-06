import React from "react";

const GPTSearch = () => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Movies..."
                className="w-16 focus:w-32 md:focus:w-64 lg:focus:w-96 md:w-32 lg:w-48 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out pr-10"
            />
        </div>
    );
};

export default GPTSearch;
