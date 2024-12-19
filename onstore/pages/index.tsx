// index.tsx
import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout isSearchVisible={isSearchVisible} setSearchVisible={setSearchVisible}>
      <div className={`${geistSans.variable} ${geistMono.variable} flex flex-col px-2 pb-2`}>
        <main className="flex-grow flex flex-col items-center text-center mt-4">
          <Image
            src="/banner.png"
            alt="Banner"
            layout="responsive"
            width={1200}
            height={2400}
            className="w-full mb-8"
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
      </div>
    </Layout>
  );
}