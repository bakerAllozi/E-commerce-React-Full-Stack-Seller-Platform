interface MyProductType {
  id: string;
  name: string;
  price: number;
  title: string;
  image: string;
  description: string;
  piecesRemaining: number;
  category: string;
  quantity: number;
  price2?: number;
  rating: {
    rate: number;
    count: number;
  };
  discount: number;
}

export default MyProductType;
