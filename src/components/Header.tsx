import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Tailwind.css';

const NavLink: React.FC<{ to: string; label: string; isActive?: boolean }> = ({
    to,
    label,
    isActive,
}) => (
    <Link
        to={to}
        className={`rounded-md px-3 py-2 text-sm font-medium ${
            isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
        aria-current={isActive ? 'page' : undefined}
    >
        {label}
    </Link>
);

const Header: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header className="sticky top-0 z-51">
            <nav className="bg-gray-800">
                <div className="mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <NavLink to="/" label="Home" isActive={currentPath === '/'} />
                                    {/* <NavLink to="/add-room" label="Add Room" isActive={currentPath === '/add-room'} /> */}
                                    <NavLink to="/show-timeline" label="Show Timeline" isActive={currentPath === '/show-timeline'} />
                                    {/* <NavLink to="/reserve-room" label="Reserve Room" isActive={currentPath === '/reserve-room'} /> */}
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                        >
                            <span className="sr-only">View notifications</span>
                            <svg
                                className="size-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
