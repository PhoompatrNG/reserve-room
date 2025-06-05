import React from 'react';
import '../css/Tailwind.css';

const Header: React.FC = () => (
    <header>
        <nav className="navbar p-4 flex justify-between bg-[#F7E6D5] text-[#5D3C18]">
            <div className="navbar-brand">
                <h1 className="text-2xl font-bold">Room Reservation System</h1>
            </div>
            <div className="navbar-container">
                <ul className="navbar-menu flex items-center gap-4">
                    <li className="navbar-item"><a href="#" className="navbar-link">Home</a></li>
                    <li className="navbar-item"><a href="#" className="navbar-link">About</a></li>
                    <li className="navbar-item"><a href="#" className="navbar-link">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Header;
