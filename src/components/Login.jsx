import React, { useState } from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { SHOW_SAGE_BG } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div className="h-screen bg-black">
            <Header />
            <div className="relative w-full h-full">
                <img
                    src={SHOW_SAGE_BG}
                    alt="Login background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute w-full h-full content-center justify-items-center">
                    {isSignInForm ? (
                        <LoginForm toggleSignInForm={toggleSignInForm} />
                    ) : (
                        <SignUpForm toggleSignInForm={toggleSignInForm} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
