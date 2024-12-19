"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import Layout from "./components/Layout";

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
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % collections.length);
  };

  const handlePreviousBanner = () => {
    setCurrentBannerIndex(
      (prevIndex) => (prevIndex - 1 + collections.length) % collections.length
    );
  };

  return (
    <Layout isSearchVisible={isSearchVisible} setSearchVisible={setSearchVisible}>
      <div className={`${geistSans.variable} ${geistMono.variable} flex flex-col px-2 pb-2`}>
        <main className="flex-grow flex flex-col items-center text-center mt-4">
          {collections.length > 0 && (
            <div className="relative w-full">
              <Image
                src={collections[currentBannerIndex].images || "/placeholder.png"}
                alt={collections[currentBannerIndex].name}
                layout="responsive"
                width={1200}
                height={600}
                className="w-full"
              />
              <h1 className="absolute bottom-10 left-10 text-4xl font-bold text-white">
                {collections[currentBannerIndex].name}
              </h1>
              <p className="absolute bottom-4 left-10 text-lg text-white">
                {collections[currentBannerIndex].description}
              </p>
              <button
                onClick={handlePreviousBanner}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
              >
                ◀
              </button>
              <button
                onClick={handleNextBanner}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
              >
                ▶
              </button>
            </div>
          )}
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
      </div>
    </Layout>
  );
}
