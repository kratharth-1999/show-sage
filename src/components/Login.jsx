import React, { useState } from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

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
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/fa7be975-efc3-48c6-8188-f07fdd1aa476/web/IN-en-20250428-TRIFECTA-perspective_e045264e-b4d4-4a6f-b2cc-f95e3344a332_large.jpg"
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
