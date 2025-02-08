import supabase from './supabase';
import { CommentsOfProductType } from '@/types/CommentsOfProduct.type';

export async function getReviews(productId: string) {
  const { data, error } = await supabase
    .from('Comments_of_product')
    .select('*')
    .eq('Product_ID', productId);

  if (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch product reviews.');
  }

  return data as CommentsOfProductType[];
}
export async function insertNewReview(newReview: CommentsOfProductType) {
  const { data, error } = await supabase
    .from('Comments_of_product')
    .insert(newReview)
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function updateReview(newRow: CommentsOfProductType) {
  const { data, error } = await supabase
    .from('Comments_of_product')
    .update(newRow)
    .eq('id', newRow.id);
  if (error) {
    console.error(error);
    throw new Error('error');
  }
  return data;
}
