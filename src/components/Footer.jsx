import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.png" alt="BrandSnap" className="h-10 w-10 rounded-lg" />
                            <span className="text-xl font-bold text-brand-navy">BrandSnap</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Snap Your Brand to Life. Generate stunning, on-brand images for your business in seconds using AI.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-brand-navy mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-brand-blue transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-600 hover:text-brand-blue transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <a href="#features" className="text-gray-600 hover:text-brand-blue transition-colors">
                                    Features
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-brand-navy mb-3">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} BrandSnap. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
