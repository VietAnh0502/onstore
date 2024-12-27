"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import Layout from "@/app/components/Layout";
import { useParams } from "next/navigation";

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

    if(!productType){
      return <Layout>Loading...</Layout>;
    }

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Red Box for Filters */}
        <div style={{ backgroundColor: "red", padding: "20px", width: "20%" }}>
          <h3>Filter by Size</h3>
          <button>Small</button>
          <button>Medium</button>
          <button>Large</button>
          <h3>Filter by Collection</h3>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Yellow Box for Product Type Images */}
          <div style={{ backgroundColor: "yellow", padding: "20px", marginBottom: "10px" }}>
            <h2>{productType.name}</h2>
              <div >
                   <img src={productType.image} alt={productType.name} style={{ height: '100px', width: 'auto' }} />
              </div>
          </div>

          {/* Green Boxes for Products */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            <Row gutter={[16, 16]}>
                            {products.map((product) => (
                <Col span={6} key={product._id}> {/* Changed span from 8 to 6 for 4 columns */}
                  <Card
                    hoverable
                    cover={<img alt={product.name} src={product.images[0]} />}
                    onClick={() => { /* Handle product click, e.g. navigate to product details */ }}
                  >
                    <Card.Meta title={product.name} description={`Price: $${product.price}`} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsTypePage;
