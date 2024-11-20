import supabase from "./supabase";

export async function getBaker() {
  const { data, error } = await supabase.from("randomData").select("*");
  if (error) {
    console.error(error);
    throw new Error("baker");
  }
  return data;
}
export async function deleteBaker(id) {
  const { data, error } = await supabase
    .from("randomData")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("bakeroooooerrerer");
  }
  return data;
}

export async function insertBaker(newRow) {
  const { data, error } = await supabase
    .from("randomData")
    .insert(newRow)
    .select();
  if (error) {
    console.error(error);
    throw new Error("bakeroooooerrerer");
  }
  return data;
}
