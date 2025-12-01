import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3">
                        <img src="/logo.png" alt="BrandSnap" className="h-10 w-10 rounded-lg" />
                        <span className="text-xl font-bold text-brand-navy">BrandSnap</span>
                    </Link>

                    {/* Navigation Links */}
                    {user && (
                        <div className="flex items-center gap-6">
                            <Link to="/dashboard" className="text-gray-700 hover:text-brand-blue transition-colors">
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white bg-brand-blue hover:bg-blue-600 rounded-lg transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
