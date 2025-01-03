export interface MyProductType {
  id: string;
  name: string;
  price: number;
  title: string;
  image: File[];
  description: string;
  userId: string;
  piecesRemaining: number;
  category: string;
  quantity: number;
  product_like: string[];
  price2?: number;
  rating: {
    rate: number;
    count: number;
  };
  discount: number;
  color1?: string;
  color2?: string;
  color: {
    color1: string;
    color2: string;
  };
}
