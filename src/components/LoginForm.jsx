import React, { useState } from "react";

const LoginForm = ({ toggleSignInForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <div className="w-full max-w-md p-6 bg-black/80 rounded-xl shadow-lg border border-black/80 space-y-6 backdrop-blur-md">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 bg-black/20 text-white border border-gray-700 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 bg-black/20 text-white border border-gray-700 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 py-3 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Sign In
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
