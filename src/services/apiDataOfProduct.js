import supabase from "./supabase";

export async function getDataOfProduct() {
  const { data, error } = await supabase.from("DataOfProduct").select("*");
  if (error) {
    console.error(error);
    throw new Error("baker");
  }
  return data;
}

export async function insertNewProduct(newRow) {
  const imageName = `${Math.random()}-${newRow.image.name}`.replaceAll("/", "");
  const imagePath = `https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/baker1/${imageName}`;

  const { data: gg, error: ee } = await supabase.storage
    .from("baker1")
    .upload(imageName, newRow.image);

  if (ee) {
    console.error("Error uploading file:", ee);
    return;
  }
  console.log("File uploaded successfully:", gg);

  const { data, error } = await supabase
    .from("DataOfProduct")
    .insert({ ...newRow, image: imagePath })
    .select();
  if (error) {
    console.error(error);
    throw new Error("bakeroooooerrerer");
  }
  return data;
}
export async function deleteProduct(id) {
  const { data, error } = await supabase
    .from("DataOfProduct")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("bakeroooooerrerer");
  }
  return data;
}
export async function updateProduct(gg) {
  console.log(gg);

  const { data, error } = await supabase
    .from("DataOfProduct")
    .update({ ...gg.EditRow })
    .eq("id", gg.id);
  if (error) {
    console.error(error);
    throw new Error("Error updating product");
  }
  return data;
}
