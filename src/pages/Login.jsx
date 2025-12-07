import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Loader from '../components/Loader';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let result;
        try {
            if (isLogin) {
                result = await login(username, password);
            } else {
                result = await register({ username, email, password });
                if (result.success) {
                    // Auto login after register
                    result = await login(username, password);
                }
            }

            if (result.success) {
                navigate('/dashboard');
            } else {
                alert(result.message || 'Authentication failed');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        try {
            const result = await loginWithGoogle(credentialResponse.credential);
            if (result.success) {
                navigate('/dashboard');
            } else {
                alert(result.message || 'Google authentication failed');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        alert('Google Sign-In failed. Please try again.');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-xl rounded-2xl max-w-md w-full">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="BrandSnap" className="h-12 w-12 rounded-lg" />
                        <span className="text-2xl font-bold text-brand-navy">BrandSnap</span>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-center text-brand-navy mb-6">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h3>

                {/* Google Sign-In Button */}
                <div className="mb-6">
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            useOneTap
                            theme="outline"
                            size="large"
                            text={isLogin ? "signin_with" : "signup_with"}
                            width="100%"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input type="text" placeholder="Username"
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                            value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    {!isLogin && (
                        <div className="mt-4">
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input type="email" placeholder="Email"
                                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    )}
                    <div className="mt-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input type="password" placeholder="Password"
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex items-baseline justify-between mt-6">
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-3 text-white rounded-lg font-semibold transition-colors shadow-lg flex items-center gap-2 ${
                                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-blue hover:bg-blue-600'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader size="small" inline={true} />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                isLogin ? 'Login' : 'Register'
                            )}
                        </button>
                        <a href="#" className="text-sm text-brand-blue hover:underline" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
                            {isLogin ? 'Need an account?' : 'Already have an account?'}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
