import React, { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validate";
import Loader from "./Loader";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IconEye } from "@tabler/icons-react";
import { IconEyeOff } from "@tabler/icons-react";

const LoginForm = ({ toggleSignInForm }) => {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const [loginFormErrors, setLoginFormErrors] = useState({
        email: "",
        password: "",
    });

    const [isSigningIn, setIsSigningIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form data
        const emailError = validateEmail(loginFormData.email);
        const passwordError = validatePassword(loginFormData.password);
        setLoginFormErrors({
            ...loginFormErrors,
            email: emailError ? emailError : "",
            password: passwordError ? passwordError : "",
        });
        if (emailError || passwordError) return;
        setIsSigningIn(true);
        // Login the user
        loginUser();
    };

    const loginUser = async () => {
        try {
            await signInWithEmailAndPassword(
                auth,
                loginFormData.email,
                loginFormData.password
            );
            setIsSigningIn(false);
        } catch (error) {
            setIsSigningIn(false);
            setLoginFormErrors({
                ...loginFormErrors,
                password: error.code + " " + error.message,
            });
        }
    };

    const togglePasswordView = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="w-full max-w-md p-6 bg-black/80 rounded-xl shadow-lg border border-black/80 space-y-6 backdrop-blur-md mx-auto max-md:w-[95%]">
            <h2 className="text-2xl font-semibold text-white text-center">
                Sign In
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={loginFormData.email}
                        onChange={(e) =>
                            setLoginFormData({
                                ...loginFormData,
                                email: e.target.value,
                            })
                        }
                        placeholder="Enter your email"
                        className={`w-full px-4 py-2 bg-black/20 text-white border border-gray-700 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            loginFormErrors.email
                                ? "ring-2 ring-red-500"
                                : "ring-0"
                        }`}
                    />
                    {loginFormErrors.email && (
                        <p className="text-red-400 font-bold">
                            {loginFormErrors.email}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-white"
                    >
                        Password
                    </label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={loginFormData.password}
                            onChange={(e) =>
                                setLoginFormData({
                                    ...loginFormData,
                                    password: e.target.value,
                                })
                            }
                            placeholder="Enter your password (Min 8 characters)"
                            className={`w-full pl-4 pr-6 py-2 bg-black/20 text-white border border-gray-700 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                loginFormErrors.password
                                    ? "ring-2 ring-red-500"
                                    : "ring-0"
                            }`}
                        />
                        {showPassword ? (
                            <IconEye
                                stroke={2}
                                className="text-white cursor-pointer absolute right-8"
                                onClick={() => {
                                    togglePasswordView();
                                }}
                            />
                        ) : (
                            <IconEyeOff
                                stroke={2}
                                className="text-white cursor-pointer absolute right-8"
                                onClick={() => {
                                    togglePasswordView();
                                }}
                            />
                        )}
                    </div>
                    {loginFormErrors.password && (
                        <p className="text-red-400 font-bold">
                            {loginFormErrors.password}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 py-3 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    {!isSigningIn ? "Sign In" : <Loader />}
                </button>
                <p className="text-gray-400" onClick={toggleSignInForm}>
                    New to ShowSage?{" "}
                    <span className="text-red-400 font-extrabold cursor-pointer">
                        Sign up Now
                    </span>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
