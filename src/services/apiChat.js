import supabase from "./supabase";

export async function getDataOfChats(id) {
  const { data, error } = await supabase
    .from("Chats")
    .select("*")
    .or(`sender_id.eq.${id},receiver_id.eq.${id}`);
  if (error) {
    console.error(error);
    throw new Error("baker");
  }
  return data;
}

export async function insertMassage(newRow) {
  const { data, error } = await supabase.from("Chats").insert(newRow).select();
  if (error) {
    console.error(error);
    throw new Error("bakeroooooerrerer");
  }
  return data;
}

export async function updateChat(newRow) {
  const { data, error } = await supabase
    .from("Chats")
    .update(newRow)
    .eq("message_id", newRow.message_id);
  if (error) {
    console.error(error);
    throw new Error("bakeroooooerrerer");
  }
  return data;
}
