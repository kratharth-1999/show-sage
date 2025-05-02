import React from "react";

const Header = () => {
    return (
        <header className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent px-8 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-red-600 text-4xl font-extrabold tracking-tight">
                    ShowSage
                </h1>
            </div>
        </header>
    );
};

export default Header;
