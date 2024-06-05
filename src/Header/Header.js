import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Link to="/dashboard" className="text-xl font-bold text-gray-800">
                    Home
                </Link>
                <nav>
                    <ul className="flex items-center space-x-4">
                        {user ? (
                            <li className="relative group">
                                <Link to="/profile" className="text-gray-800">
                                    {user.name}
                                </Link>
                                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" className="text-gray-800 hover:text-gray-600">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
