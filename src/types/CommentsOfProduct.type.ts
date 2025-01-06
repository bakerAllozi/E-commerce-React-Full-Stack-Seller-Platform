export interface CommentsOfProductType {
  Product_ID: string;
  created_at: Date;
  comment: string;
  rating: number;
  name: string;
  User_ID: string;
  id: string;
  Replies: {
    id: string;
    reply: string;
    name: string;
    createdAt: string;
  }[];
}
