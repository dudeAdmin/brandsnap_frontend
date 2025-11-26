import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Image as ImageIcon } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="BrandSnap" className="h-10 w-10 rounded-lg" />
                            <span className="text-xl font-bold text-brand-navy">BrandSnap</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/login"
                                className="px-6 py-2 text-sm font-semibold text-white bg-brand-blue hover:bg-blue-600 rounded-lg transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-brand-navy mb-6 leading-tight">
                            Snap Your<br />Brand to Life.
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Generate stunning, on-brand images for your business in seconds using AI.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/login"
                                className="px-8 py-3 text-lg font-semibold text-white bg-brand-blue hover:bg-blue-600 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                            >
                                Get Started
                            </Link>
                            <button className="px-8 py-3 text-lg font-semibold text-brand-blue border-2 border-brand-blue hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                </svg>
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    {/* Right side - Hero illustration */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 shadow-xl">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="bg-brand-teal rounded-lg p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">Autumn Collection</h3>
                                    <div className="flex gap-2">
                                        <div className="w-16 h-16 bg-orange-400 rounded-lg"></div>
                                        <div className="w-16 h-16 bg-yellow-500 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 bg-brand-yellow rounded-lg p-3 shadow-lg">
                                <Sparkles className="text-brand-navy" size={24} />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg">
                                <Zap className="text-brand-blue" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-brand-navy mb-4">
                            Create Images That<br />Elevate Your Brand
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            With BrandSnap, easily produce eye-catching visuals tailored to your brand's identity and marketing needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center p-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-lg mb-6">
                                <Sparkles className="text-brand-teal" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy mb-3">Tailored Content</h3>
                            <p className="text-gray-600">
                                Generate images that perfectly match your brand's style and voice.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6">
                                <Zap className="text-brand-blue" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy mb-3">Instant Results</h3>
                            <p className="text-gray-600">
                                Get high-quality images in mere seconds with AI-powered technology.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-6">
                                <ImageIcon className="text-brand-teal" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy mb-3">Versatile Use</h3>
                            <p className="text-gray-600">
                                Create visuals for social media, websites, ads, and more.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-brand-navy py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Brand?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of businesses creating stunning visuals with AI
                    </p>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-4 text-lg font-semibold text-brand-navy bg-brand-yellow hover:bg-yellow-400 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                        Get Started Free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-8 border-t border-gray-200">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p>&copy; 2025 BrandSnap. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
