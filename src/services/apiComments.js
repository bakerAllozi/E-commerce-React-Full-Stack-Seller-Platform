import supabase from "./supabase";

export async function getComments() {
  const { data, error } = await supabase.from("Comments").select("*");
  if (error) {
    console.error(error);
    throw new Error("baker");
  }
  return data;
}

export async function insertNewComment(newRow) {
  const { data: dataa, error } = await supabase
    .from("Comments")
    .insert(newRow)
    .select();
  if (error) {
    console.error(error);
    throw new Error("bakeroooooerrerer");
  }

  return dataa;
}
