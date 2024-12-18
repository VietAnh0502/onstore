import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

// Define the Product type
interface Product {
  _id: string;  // Unique identifier
  name: string;
  description: string;
  coll: string; // Collection reference ID
  price: number;
  category: string;
  type: string;
  size: string;
  color: string;
  brand: string;
  material?: string; // Optional field
  stock: number;
  createdAt: Date;
  images: string[]; // Array of image URLs
  discountPrice?: number; // Optional field
  averageRating?: number; // Optional field
  reviews: {
    username: string;
    rating: number;
    text: string;
  }[];
  careInstructions?: string; // Optional field
  releaseDate?: Date; // Optional field
}

// Font setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Specify the type here

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data: Product[] = await response.json(); // Expect an array of Product
        setProducts(data); // Set the products in the state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen px-4 pt-4 pb-4`}>
      <header className="flex justify-between items-center">
        <nav className="flex-grow flex items-center justify-center ">
          <ul className="flex space-x-6 ml-24">
            <li><strong>Homepage</strong></li>
            <li><strong>Shop</strong></li>
            <li><strong>New Arrivals</strong></li>
            <li>Contact</li>
            <li>Sale Deals</li>
          </ul>

          <div className="flex items-center relative ml-4">
          <button
            onClick={() => setSearchVisible(!isSearchVisible)} // Toggle search box visibility
            className="bg-transparent border-none focus:outline-none"
          >
            🔍 {/* Icon for search */}
          </button>
          {isSearchVisible && (
            <input 
              type="text" 
              placeholder="Search..."
              className="border border-gray-300 rounded px-2 py-1 ml-2" // Search box styling
            />
          )}
        </div>
        </nav>
        
        <nav className="flex items-center ml-4">
          {/* Cart Icon */}
          <div className="relative cursor-pointer mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white" // Set the icon color to white
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.5 1h11l1.5 4H6m0 0h12m0 0a4 4 0 11-8 0m8 0a4 4 0 01-8 0" />
            </svg>
            <span className="absolute top-[-10px] right-[-10px] bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">1</span> {/* Optional: notification badge */}
          </div>

          {/* Sign In Account */}
          <div className="relative cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white" // Icon color set to white
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12v-2a4 4 0 00-8 0v2m8 0a4 4 0 01-4 4h-1a4 4 0 01-4-4m4 0a4 4 0 014-4h1a4 4 0 014 4v2" />
            </svg>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center text-center mt-4">
        <Image
          src="/banner.png" // Ensure this image is in the public folder
          alt="Banner"
          layout="responsive" // Use responsive layout
          width={1200} // Original width of the image
          height={2400} // Original height of the image
          className="w-full mb-8" // Ensure it takes the full width
        />
        <h1 className="text-4xl font-bold">New Arrival</h1>
        <h2 className="text-2xl">2024 autumn</h2>
      </main>

      <section className="flex flex-col">
        <h3 className="text-xl font-semibold">Collections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          {products.map((product) => (
            <div key={product._id} className="relative group">
              <Image 
                src={product.images[0] || "/placeholder.png"} 
                alt={product.name} 
                width={1150} 
                height={1250} 
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 w-full text-left">
                <p className="text-sm">{product.name}</p>
                <p className="text-lg">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
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
}