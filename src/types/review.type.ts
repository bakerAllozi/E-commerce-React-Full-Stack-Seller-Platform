export interface ReviewType {
  id: string;
  Product_ID: string;
  comment: string;
  rating: number;
  name: string;
  User_ID: string;
  created_at: string;
  Replies: {
    id: string;
    reply: string;
    name: string;
    createdAt: string;
  }[];
}
