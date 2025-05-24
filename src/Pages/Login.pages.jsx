import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import {Toaster,toast} from 'react-hot-toast';
import { authwithGoogle } from '../conf/configure';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import AnimationWrapper from '../common/page-animation';
import { loginStart,loginFailure,loginSuccess,logOut } from '../features/auth/authSlice';





const Login = () => {

    const location = useLocation();

const API_BASE_URL =  'https://server-vibepage.vercel.app';
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const {isLoading, error: reduxError} = useSelector(state => state.auth.data);
    const {isLoggedIN} = useSelector(state => state.auth.data);


    const [error, setError] = useState('');
    const navigate = useNavigate();

    const from = location.state?.from?.pathname ;
    console.log(from);








const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (error) setError('');
    };











const handleLogin = async (e) => {
        e.preventDefault();
       const { email, password } = formData;
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        

        dispatch(loginStart());
        

        try {
            const response = await axios.post(API_BASE_URL+'/api/login', {
                email:email,
                password:password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Login response:', response.data);

            if (response.data.success) {

                if (response.data.accessToken) {
                    localStorage.setItem('accessToken',response.data.accessToken);
                }
                dispatch(loginSuccess({
                    user: response.data.user,
                    accessToken: response.data.accessToken

                }));
                
                navigate(from);
            } else {
                dispatch(loginFailure(response.data.message|| 'Login failed. Please check your credentials.'));
                setError(response.data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            dispatch(loginFailure(err.response.data.error|| 'Login failed. Please try again.'));
            console.error('Login error:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.error || 'Invalid credentials');
            } else if (err.request) {
                // The request was made but no response was received
                setError('No response from server. Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An unexpected error occurred. Please try again.');
            }
        } 
    };






  useEffect(() => {
   if( isLoggedIN){
    navigate(from ||'/')

   }},[isLoggedIN,navigate])
    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/signup');
    };







const handleGoogleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
        // Get Google auth token
        const user = await authwithGoogle();
        
        
        if (user) {
            // Send token to your backend
            const response = await axios.post(API_BASE_URL+'/api/google-login', {
                accessToken: user.accessToken
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            
            // Check if backend returned the token directly (not checking success property)
            if (response.data.accessToken) {
                // Store YOUR server's token, not Google's token
                localStorage.setItem('accessToken', response.data.accessToken);
                
                dispatch(loginSuccess({
                    user: response.data.user,
                    accessToken: response.data.accessToken
                }));
                
                navigate(from||"/");
            } else {
                // Handle case where backend didn't return a token
                throw new Error('No access token received from server');
            }
        }
    } catch (error) {
        console.error('Google login error:', error);
        
        // Extract the most useful error message
        const errorMessage = error.response?.data?.error || 
                             error.response?.data?.message || 
                             error.message || 
                             'Google login failed. Please try again.';
        
        dispatch(loginFailure(errorMessage));
        toast.error(errorMessage);
    }
};













    return (
        <>
       
        <AnimationWrapper>
        <Toaster />
            
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <button
                            onClick={handleSignup}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            create a new account
                        </button>
                    </p>
                </div>

                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                               Email
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your  email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                onClick={handleLogin}
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                    isLoading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login Options */}
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-2">GitHub</span>
                                </button>

                                <button 
                                onClick={handleGoogleLogin}
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span className="ml-2">Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </AnimationWrapper>
    
        </>
    );
};

export default Login;