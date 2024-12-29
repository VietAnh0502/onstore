"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MenuItem } from '@mui/material';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MainDrawerList from './main/main.drawerlist';

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
    const [open, setOpen] = React.useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    const MenuItemH = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <li><Link href={href}><strong>{children}</strong></Link></li>
    );

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const ProductTypeLinks = () => (
        <div className="absolute transform -translate-x-1/3 translate-y-5 group-hover:translate-y-0 hover-to-show bg-[var(--background)] shadow-inner w-auto transition-all duration-300 rounded-md z-10 group-hover:flex p-2" style={{ marginTop: "17px" }}>
            <div className="flex space-x-4">
                {productTypes.map(type => (
                    <div key={type._id} className="flex flex-col items-center p-2 w-40">
                        <Link href={`/producttypes/${type._id}`} className="flex flex-col items-center">
                            <div className="relative overflow-hidden w-32 h-32 mb-2 transform transition-transform duration-300 hover:scale-110">
                                <img
                                    src={type.image}
                                    alt={type.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-center transition-all duration-300 hover:text-blue-500">
                                {type.name}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
<header className="fixed top-0 w-full flex justify-between items-center shadow-md p-2 bg-[var(--background)] z-50 pt-4 pb-4" style={{ fontWeight: "lighter" }}>
<button onClick={toggleMenu} className="md:hidden focus:outline-none" aria-label="Toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            <nav className={`flex-grow items-center justify-center md:flex ${isMenuOpen ? 'hidden' : 'hidden md:flex'}`}>
                <ul className="flex space-x-6">
                    <MenuItemH href="/">Homepage</MenuItemH>
                    <li className="relative group transition-all hover-to-show-link" onMouseEnter={fetchProductTypes}>
                        <a
                            href="#"
                            className="cursor-pointer hover:text-blue-300 active:text-blue-500 transition-all duration-300">
                            <strong>Shop</strong>
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-300 transition-all group-hover:w-full active:w-full"></span>
                        </a>
                        <ProductTypeLinks />
                    </li>
                    <MenuItemH href="/new-arrivals">New Arrivals</MenuItemH>
                    <MenuItemH href="/contact">Contact</MenuItemH>
                    <MenuItemH href="/sale-deals">Sale Deals</MenuItemH>
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
                        <MenuItemH href="/">Homepage</MenuItemH>
                        <li className="relative group transition-all hover-to-show-link" onMouseEnter={fetchProductTypes}>
                            <a
                                href="#"
                                className="cursor-pointer hover:text-blue-300 active:text-blue-500 transition-all duration-300">
                                <strong>Shop</strong>
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-300 transition-all group-hover:w-full active:w-full"></span>
                            </a>
                            <ProductTypeLinks />
                        </li>
                        <MenuItemH href="/new-arrivals">New Arrivals</MenuItemH>
                        <MenuItemH href="/contact">Contact</MenuItemH>
                        <MenuItemH href="/sale-deals">Sale Deals</MenuItemH>
                    </ul>
                </div>
            </div>

            <nav className="flex items-center mr-2">
                <div className="flex items-center relative mr-4">
                    {/* Hiển thị trường tìm kiếm với hiệu ứng */}
<div className={`transition-all duration-500 ease-in-out ${isSearchVisible ? 'w-64' : 'w-0'} overflow-hidden`}>
    <input
        type="text"
        placeholder="Search..."
        className=" border-gray-300 rounded px-2 py-1 w-full text-black dark:text-white dark:bg-transparent focus:outline-none focus:ring-0"
        autoFocus
    />
</div>
{/* Thêm hiệu ứng cho trường tìm kiếm */}
<button onClick={() => setSearchVisible(!isSearchVisible)} className="bg-transparent border-none focus:outline-none">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
</button>


                    
                </div>

                <div className="relative cursor-pointer mr-4">
                    <div onClick={toggleDrawer(true)}>
                        <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                    </div>
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

            <MainDrawerList
                toggleDrawer={toggleDrawer}
                open={open}
            ></MainDrawerList>
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

export default Header;
