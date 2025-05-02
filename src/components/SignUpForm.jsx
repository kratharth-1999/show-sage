import React, { useState } from "react";
import z from "zod";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const validateSignUpFormSchema = z
    .object({
        name: z.string().min(1, "Full name is required"),
        email: z
            .string()
            .email("Email is not valid")
            .min(1, "Email is required"),
        password: z.string().min(8, "Password must have atleast 8 characters"),
        confirmPassword: z
            .string()
            .min(8, "Password must have atleast 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const SignUpForm = ({ toggleSignInForm }) => {
    const [errors, setErrors] = useState({});
    const [isSigningUp, setIsSigningUp] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        try {
            validateSignUpFormSchema.parse(data);
            setIsSigningUp(true);
            setErrors({});
            signUpUser(data);
        } catch (err) {
            if (err instanceof z.ZodError) {
                const formattedErrors = err.errors.reduce((acc, error) => {
                    const fieldName = error.path[0];
                    acc[fieldName] = error.message;
                    return acc;
                }, {});
                setErrors(formattedErrors);
            }
        }
    };

    const signUpUser = async (data) => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            updateProfile(user.user, {
                displayName: data.name,
            })
                .then(() => {
                    setIsSigningUp(false);
                    toast.success("User signed up successfully!");
                    navigate("/browse");
                    const { uid, email, displayName } = auth.currentUser;
                    dispatch(
                        addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                        })
                    );
                })
                .catch((error) => {
                    toast.error("Something went wrong. Please try again!");
                });
        } catch (error) {
            setIsSigningUp(false);
            setErrors({ confirmPassword: error.code + " " + error.message });
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-black/80 rounded-xl shadow-lg border border-black/80 space-y-6 backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-white text-center">
                Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium text-white"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-2 bg-black/20 text-white border border-gray-700 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            errors.name ? "ring-2 ring-red-500" : "ring-0"
                        }`}
                    />
                    {errors.name && (
                        <p className="text-red-400 font-bold">{errors.name}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className={`w-full px-4 py-2 bg-black/20 text-white border border-gray-700 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            errors.email ? "ring-2 ring-red-500" : "ring-0"
                        }`}
                    />
                    {errors.email && (
                        <p className="text-red-400 font-bold">{errors.email}</p>
                    )}
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
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className={`w-full px-4 py-2 bg-black/20 text-white border border-gray-700 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            errors.password ? "ring-2 ring-red-500" : "ring-0"
                        }`}
                    />
                    {errors.password && (
                        <p className="text-red-400 font-bold">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-white"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Re enter your password"
                        className={`w-full px-4 py-2 bg-black/20 text-white border border-gray-700 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            errors.confirmPassword
                                ? "ring-2 ring-red-500"
                                : "ring-0"
                        }`}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-400 font-bold">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 py-3 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    {!isSigningUp ? "Sign Up" : <Loader />}
                </button>
                <p
                    className="text-gray-400 cursor-pointer"
                    onClick={toggleSignInForm}
                >
                    Already a member?{" "}
                    <span className="text-red-400 font-extrabold cursor-pointer">
                        Sign in Now
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignUpForm;
