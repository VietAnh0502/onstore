'use client';
import { useEffect, useState } from 'react';
import ProductDetail from '../../components/ProductDetail';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Product ID:', params.id);  // Kiểm tra ID

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/product/${params.id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return <ProductDetail product={product} />;
}