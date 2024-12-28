"use client";
import ProductDetail from "@/app/components/ProductDetail";
import { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default function ProductPage({ params }: PageProps) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resolvedParams = await params; // Resolve the Promise
        console.log("Product ID:", resolvedParams.id);

        const response = await fetch(
          `http://localhost:3002/api/products/${resolvedParams.id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return <ProductDetail product={product} />;
}
