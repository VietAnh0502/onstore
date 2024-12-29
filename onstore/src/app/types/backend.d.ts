interface ICart {
    "_id": string;
    "quantity": number;
    "detail": IProduct
}
interface IProduct {
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
  

interface IOrder {
    "userId": string;
    "totalPrice": number;
    "address": string;
    "phone": string;
    "pay": string; 
    "detail": IDetailOrder[]
}

interface IDetailOrder {
    "productId": string;
    "quantity": number;
}