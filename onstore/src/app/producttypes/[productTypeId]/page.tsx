"use client"
import React, { useEffect, useState } from "react";
import { Row, Col, Card, message } from "antd"; // Added message for notifications
import Layout from "@/app/components/Layout";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";



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

interface ProductType {
  _id: string;
  name: string;
  image: string;
  description?: string;
  createdAt?: Date;
}

const ProductsTypePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productType, setProductType] = useState<ProductType | null>(null);
  const { productTypeId } = useParams();
  const router = useRouter();
  


  useEffect(() => {
    const fetchProducts = async () => {
      if (!productTypeId) return;
      const response = await fetch(
        `http://localhost:3002/api/product/${productTypeId}/products`
      );
      const data: Product[] = await response.json();
      setProducts(data);
    };

    const fetchProductType = async () => {
      if (!productTypeId) return;
      const response = await fetch(
        `http://localhost:3002/api/product-types/${productTypeId}`
      );
      const data: ProductType = await response.json();
      setProductType(data);
    };

    fetchProducts();
    fetchProductType();
  }, [productTypeId]);

  if (!productType) {
    return <Layout>Loading...</Layout>;
  }
  

  return (
    <Layout>
      <div style={{ backgroundColor: "#F8F8F8" }}>
        <h3 className=" mb-2 text-slate-400">
          Home | <strong>{productType.name}</strong>
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "50px",
          marginRight: "50px",
        }}
      >
        <div style={{ padding: "20px", width: "20%" }}>
          <h3>Filter by Size</h3>
          <button>Small</button>
          <button>Medium</button>
          <button>Large</button>
          <h3>Filter by Collection</h3>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div>
            <div
              style={{
                height: "auto",
                width: "100%",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <img
                src={productType.image}
                alt={productType.name}
                className="rounded-md"
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
            <Row gutter={[16, 16]}>
            {products.map((product) => (
                <Col span={6} key={product._id}>
                  <ProductCard 
                    product={product} 
                    onClick={() => {
                      router.push(`/producttypes/${productTypeId}/products/${product._id}`, { scroll: true });
                    }} 
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const addToCart = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/carts/cartId/items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }), // Assuming 1 is the quantity
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      //message.success(`${product.name} added to cart!`); // Show success message
    } catch (error) {
      //message.error(error.message || 'An error occurred while adding to cart');
    }
  };

  return (
    <Card
      hoverable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cover={
        <div style={{ position: "relative" }}>
          <img alt={product.name} src={product.images[0]} />
          <motion.div
            className="absolute bottom-0 transform -translate-x-1/2 p-2 cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
          >
            <div className="bg-black rounded-md p-2 opacity-75 hover:opacity-65" onClick={addToCart}>
              <FiShoppingCart size={20} color="white" />
            </div>
          </motion.div>
        </div>
      }
      //onClick={onClick}
    >
      <Card.Meta title={product.name} description={`Price: $${product.price}`} />
    </Card>
  );
};

export default ProductsTypePage;