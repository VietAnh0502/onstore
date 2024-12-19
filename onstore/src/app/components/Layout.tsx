// Layout.tsx
"use client"; 
import React, { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode; // Specify that children can be any valid React node
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSearchVisible, setSearchVisible] = useState(false); // Define state for search visibility

  return (
    <div className="flex flex-col min-h-screen pt-4 ">
      <header className="flex justify-between items-center ml-4 mr-4">
        <nav className="flex-grow flex items-center justify-center ">
          <ul className="flex space-x-6 ml-50percentage">
            <li><strong>Homepage</strong></li>
            <li><strong>Shop</strong></li>
            <li><strong>New Arrivals</strong></li>
            <li>Contact</li>
            <li>Sale Deals</li>
          </ul>
        </nav>

        <nav className="flex items-center ml-4">
          {/* Search icon and button */}
          <div className="flex items-center relative mr-4">
            <button
              onClick={() => setSearchVisible(!isSearchVisible)} // Toggle search box visibility
              className="bg-transparent border-none focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            {isSearchVisible && (
              <input 
                type="text" 
                placeholder="Search..."
                className="border border-gray-300 rounded px-2 py-1 ml-2" // Search box styling
              />
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative cursor-pointer mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="absolute top-[-10px] right-[-10px] bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">1</span> {/* Optional: notification badge */}
          </div>

          {/* Sign In Account */}
          <div className="relative cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-bold">INFORMATION</h4>
              <ul>
                <li>About Us</li>
                <li>Track Your Order</li>
                <li>Shipping Information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">CUSTOMER CARE</h4>
              <ul>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Returns & Exchange Policy</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">CONTACT US</h4>
              <p>Phone: +92 21 111-244-266</p>
              <p>Email: orders@bonanzagt.com</p>
              <p>Customer Care: Monday to Saturday: 9am to 8pm</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>© 2024 Bonanza | All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;