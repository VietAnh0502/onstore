// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;