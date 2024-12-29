"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import Layout from "./components/Layout";
import { useRouter } from "next/navigation";


interface Product {
  _id: string;
  name: string;
  description: string;
  coll: string;
  price: number;
  category: string;
  type: string;
  size: string;
  color: string;
  brand: string;
  material?: string;
  stock: number;
  createdAt: Date;
  images: string[];
  discountPrice?: number;
  averageRating?: number;
  reviews: {
    username: string;
    rating: number;
    text: string;
  }[];
  careInstructions?: string;
  releaseDate?: Date;
}

interface Collection {
  _id: string;
  name: string;
  images: string;
  description: string;
  createdAt?: Date;
}

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
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const visibleCount = 4; // Number of products visible at once

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCollections = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/collections");
        const data: Collection[] = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchProducts();
    fetchCollections();
  }, []);

  const handleNextBanner = () => {
    setFade(true);  // Start fade animation
    setTimeout(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % collections.length);
      setFade(false);  // Reset fade after the image changes
    }, 180);  // Adjust timeout to match the CSS transition duration
  };

  const handlePreviousBanner = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex - 1 + collections.length) % collections.length
      );
      setFade(false);
    }, 180);
  };

  const handleNext = () => {
    // Move to the next product but keep within bounds
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % products.length
    );
  };

  const handlePrevious = () => {
    // Move to the previous product but keep within bounds
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + products.length) % products.length
    );
  };
  
  const maxIndex = products.length - visibleCount; // Total number of allowed presses

  const router = useRouter();
  const hanldeReToDetail = (id: string) => {
    router.push(`/product/${id}`);
  }
  return (
    <Layout>
      <div className={`${geistSans.variable} ${geistMono.variable} flex flex-col px-2 pb-2`}>
        <main className="flex-grow flex flex-col items-center text-center mt-2">
          {collections.length > 0 && (
            <div className="relative w-full ">
              <div className={`transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                  src={collections[currentBannerIndex].images || "/placeholder.png"}
                  alt={collections[currentBannerIndex].name}
                  layout="responsive"
                  width={1450}
                  height={500}
                  className="w-full"
                  style={{ maxHeight: '800px'}}
                />
                <h1 className="flex justify-center mt-4 bottom-10 left-10 text-4xl font-bold ">
                  {collections[currentBannerIndex].name}
                </h1>
                <p className="flex justify-center bottom-4 left-10 text-lg">
                  {collections[currentBannerIndex].description}
                </p>
                <button
                  onClick={handlePreviousBanner}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-lg"
                >
                  ◀
                </button>
                <button
                  onClick={handleNextBanner}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-lg"
                >
                  ▶
                </button>
              </div>
            </div>
          )}
        </main>

         {/* New Arrivals Section */}
        <section className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">New Arrivals</h3>
          {products.length > 0 && (
            <div className="relative w-4/5 overflow-hidden ">
              {/* Product Slide Container */}
              <div
                className="flex transition-transform duration-500 ease-in-out "
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                  width: `products.length`,
                }}
              >
                {/* Individual Product Cards */}
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className="flex justify-center items-center "
                    style={{ width: `${100 / visibleCount}%` }}
                    onClick={()=> hanldeReToDetail(product._id)}
                  >
                    <div className="p-4 box-border w-80 image-container">
                      <Image
                        src={product.images[0] || "/placeholder.png"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="image"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-lg font-bold">${product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-lg"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-lg"
              >
                ▶
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}