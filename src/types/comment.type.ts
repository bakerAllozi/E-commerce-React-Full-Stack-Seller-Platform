import { FieldValues, UseFormRegister } from "react-hook-form";

export interface CommentType {
  comment: string;
  yourRating: number;
  name?: string;
  email?: string;
  id?: string;
  yourName?: string;
  created_at?: number;
}
