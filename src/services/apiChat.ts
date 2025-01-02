import supabase from "./supabase";

interface ChatRow {
  message_id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at?: string;
}

export async function getDataOfChats(id: string): Promise<ChatRow[] | null> {
  const { data, error } = await supabase
    .from("Chats")
    .select("*")
    .or(`sender_id.eq.${id},receiver_id.eq.${id}`);

  if (error) {
    console.error(error);
    throw new Error("Error fetching chats");
  }

  return data;
}

export async function insertMassage(
  newRow: Omit<ChatRow, "message_id">
): Promise<ChatRow[] | null> {
  const { data, error } = await supabase.from("Chats").insert(newRow).select();

  if (error) {
    console.error(error);
    throw new Error("Error inserting message");
  }

  return data;
}

export async function updateChat(
  newRow: Pick<ChatRow, "message_id"> & Partial<ChatRow>
): Promise<ChatRow[] | null> {
  const { data, error } = await supabase
    .from("Chats")
    .update(newRow)
    .eq("message_id", newRow.message_id);

  if (error) {
    console.error(error);
    throw new Error("Error updating chat");
  }

  return data;
}
