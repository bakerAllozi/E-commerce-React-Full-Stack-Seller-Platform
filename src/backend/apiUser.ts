import supabase from './supabase';

export async function getPublicUser() {
  const { data, error } = await supabase.from('User').select('*');
  if (error) {
    console.error(error);
    throw new Error('error fetching users');
  }
  return data;
}
