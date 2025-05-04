import React from "react";

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="space-y-4">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="text-lg w-1/2 2xl:block hidden">{overview}</p>
            <div className="flex gap-x-4">
                <button className="bg-white text-black py-2 px-6 rounded-md text-xl font-bold hover:bg-opacity-80">
                    Play
                </button>
                <button className="bg-gray-500 text-white py-2 px-6 rounded-md text-xl font-bold bg-opacity-50 hover:bg-opacity-80">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
