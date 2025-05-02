import React from "react";
import { useNavigate } from "react-router";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                toast.error("Something went wrong, please try again!");
            });
    };

    return (
        <header className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent px-8 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-red-600 text-4xl font-extrabold tracking-tight">
                    ShowSage
                </h1>
                <div className="flex items-center gap-x-2">
                    {user?.displayName && (
                        <span className="text-red-500 font-bold text-lg">
                            Welcome, {user.displayName}
                        </span>
                    )}
                    {user && (
                        <button
                            type="button"
                            className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 p-2"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
