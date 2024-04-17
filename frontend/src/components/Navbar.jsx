// Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <span className="text-white text-xl font-bold">Logo</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-white hover:text-gray-300">Home</a>
                        <a href="#" className="text-white hover:text-gray-300">About</a>
                        <a href="#" className="text-white hover:text-gray-300">Services</a>
                        <a href="#" className="text-white hover:text-gray-300">Contact</a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="text-white focus:outline-none" onClick={toggleNavbar}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-4">
                        <a href="#" className="block text-white py-2 px-4">Home</a>
                        <a href="#" className="block text-white py-2 px-4">About</a>
                        <a href="#" className="block text-white py-2 px-4">Services</a>
                        <a href="#" className="block text-white py-2 px-4">Contact</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
