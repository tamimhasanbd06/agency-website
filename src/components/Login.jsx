import React, { useState } from 'react';
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { loginWithEmail, GoogleLogin } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await loginWithEmail(data.email, data.password);
            Swal.fire({
                title: "Login successfully",
                icon: "success",
                draggable: true,
            });
            setError("");
            navigate("/");
        } catch (err) {
            console.error("Failed to login", err);
            setError(err.message ?? "Failed to login. Please try again...");
        } finally {
            setLoading(false);
        }
    };

    // Google login
    const handleGoogleLogin = async () => {
        try{
            await GoogleLogin();
            navigate("/")
        } catch (error) {
            console.error("Failed to login", error)
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg'>
                <h2 className='text-2xl font-bold text-center text-gray-800'>Please Login</h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    {/* Email */}
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700'>Email:</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Invalid email address",
                                }
                            })}
                            type="email"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className='text-sm italic text-red-500 mt-2'>{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700'>Password:</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                }
                            })}
                            type="password"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Error message */}
                    {error && <p className='text-sm italic text-red-500'>{error}</p>}

                    {/* Submit button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50'
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Social login */}
                <div className='text-center space-y-4'>
                    <p className='text-gray-600'>Or login with</p>
                    <div className='flex flex-col sm:flex-row justify-center gap-4'>
                        <button onClick={handleGoogleLogin} type="button" className='flex w-full items-center px-4 py-2 space-x-2 text-white bg-red-500 rounded hover:bg-red-600'>
                            <FaGoogle />
                            <span>Google</span>
                        </button>

                        <button type="button" className='flex w-full items-center px-4 py-2 space-x-2 text-white bg-gray-800 rounded hover:bg-gray-900'>
                            <FaGithub />
                            <span>GitHub</span>
                        </button>

                        <button type="button" className='flex w-full items-center px-4 py-2 space-x-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                            <FaFacebook />
                            <span>Facebook</span>
                        </button>
                    </div>
                </div>

                {/* Register link */}
                <p className='text-sm text-center text-gray-600'>
                    Do not have an account?
                    <Link to="/register" className='text-blue-600 hover:underline'> Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
