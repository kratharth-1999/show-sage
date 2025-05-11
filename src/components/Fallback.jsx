import React from "react";

const ShowSageFallback = () => {
    return (
        <div className="bg-black h-screen flex flex-col items-center justify-center">
            <div className="w-12 h-16 text-6xl font-bold text-red-500">S</div>
            <p className="text-red-500 text-lg mt-4 animate-pulse">
                Loading...
            </p>
        </div>
    );
};

export default ShowSageFallback;
