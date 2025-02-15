// Header.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

interface ProductType {
    _id: string;
    name: string;
    image: string;
}

interface HeaderProps {
    isUserLoggedIn: boolean;
    username: string;
    showUserModal: boolean;
    toggleUserModal: () => void;
    handleLogout: () => void;
    productTypes: ProductType[];
    fetchProductTypes: () => void;
    isSearchVisible: boolean;
    setSearchVisible: (visible: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
    isUserLoggedIn,
    username,
    showUserModal,
    toggleUserModal,
    handleLogout,
    productTypes,
    fetchProductTypes,
    isSearchVisible,
    setSearchVisible
}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    const MenuItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <li><Link href={href}><strong>{children}</strong></Link></li>
    );

    const ProductTypeLinks = () => (
        <div className="absolute transform -translate-x-1/3 hover-to-show bg-white shadow-inner w-auto transition-all rounded-md z-10 group-hover:flex p-2">
            <div className="flex space-x-4">
                {productTypes.map(type => (
                    <div key={type._id} className="flex flex-col items-center p-2 w-40">
                        <Link href={`/producttypes/${type._id}`} className="flex flex-col items-center"> {/* Changed href here */}
                            <img src={type.image} alt={type.name} className="w-32 h-32 object-cover mb-2" />
                            <span className="font-semibold text-center">{type.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <header className="flex justify-between items-center shadow-md p-2">
            <button onClick={toggleMenu} className="md:hidden focus:outline-none" aria-label="Toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            <nav className={`flex-grow items-center justify-center md:flex ${isMenuOpen ? 'hidden' : 'hidden md:flex'}`}>
                <ul className="flex space-x-6">
                    <MenuItem href="/">Homepage</MenuItem>
                    <li className="relative group transition-all mb-4 hover-to-show-link" onMouseEnter={fetchProductTypes}>
                        <strong>Shop</strong>
                        <ProductTypeLinks />
                    </li>
                    <MenuItem href="/new-arrivals">New Arrivals</MenuItem>
                    <MenuItem href="/contact">Contact</MenuItem>
                    <MenuItem href="/sale-deals">Sale Deals</MenuItem>
                </ul>
            </nav>

            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4">
                    <button onClick={toggleMenu} className="focus:outline-none mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ul className="flex flex-col space-y-4">
                        <MenuItem href="/">Homepage</MenuItem>
                        <li className="relative group transition-all mb-4 hover-to-show-link" onMouseEnter={fetchProductTypes}>
                            <strong>Shop</strong>
                            <ProductTypeLinks />
                        </li>
                        <MenuItem href="/new-arrivals">New Arrivals</MenuItem>
                        <MenuItem href="/contact">Contact</MenuItem>
                        <MenuItem href="/sale-deals">Sale Deals</MenuItem>
                    </ul>
                </div>
            </div>

            <nav className="flex items-center mb-4">
                <div className="flex items-center relative mr-4">
                    <button onClick={() => setSearchVisible(!isSearchVisible)} className="bg-transparent border-none focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>

                <div className="relative cursor-pointer mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span className="absolute top-[-10px] right-[-10px] bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">1</span>
                </div>

                <div className="relative cursor-pointer" onClick={toggleUserModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </nav>

            {showUserModal && (
                <UserModal username={username} handleLogout={handleLogout} toggleUserModal={toggleUserModal} />
            )}

            {isSearchVisible && (
                <SearchModal setSearchVisible={setSearchVisible} />
            )}
        </header>
    );
};

const UserModal: React.FC<{ username: string; handleLogout: () => void; toggleUserModal: () => void; }> = ({ username, handleLogout, toggleUserModal }) => (
    <div className="absolute top-16 right-5 bg-white shadow-md p-6 rounded-lg z-10 w-72 border border-gray-200">
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p className="font-semibold text-lg">Hi {username}</p>
            </div>
            <hr className="w-full border-gray-300" />
            <button className="flex items-center space-x-2 w-full text-left">
                <p>Your information</p>
            </button>
            <button className="flex items-center space-x-2 w-full text-left">
                <p>Your orders</p>
            </button>
            <hr className="w-full border-gray-300" />
            <p className="text-sm italic text-gray-500 text-center">
                Clothes aren't going to change the world. <br /> The women who wear them will.
            </p>
            <div className="flex space-x-2 w-full">
                <button onClick={toggleUserModal} className="flex-grow py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100">Close</button>
                <button onClick={handleLogout} className="flex-grow py-2 rounded border border-gray-400 bg-red-500 text-white hover:bg-red-600">Logout</button>
            </div>
        </div>
    </div>
);

const SearchModal: React.FC<{ setSearchVisible: (visible: boolean) => void; }> = ({ setSearchVisible }) => (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Search</h2>
            <input type="text" placeholder="Search..." className="border border-gray-300 rounded px-2 py-1 w-full" />
            <button onClick={() => setSearchVisible(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
    </div>
);

export default Header;