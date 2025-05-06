import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { Logo } from "./Logo";
import GPTSearch from "./GPTSearch";

const Header = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // This is like adding an event listener and retains the user on page refresh
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    addUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    })
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        // Unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                toast.error("Something went wrong, please try again!");
            });
    };

    return (
        <header className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent px-8 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-x-2">
                    <GPTSearch />
                    {user && (
                        <button
                            type="button"
                            className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 p-2 shadow-md font-semibold"
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
