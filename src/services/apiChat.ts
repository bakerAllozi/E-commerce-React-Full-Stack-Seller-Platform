import { ChatMessageType } from "@/types/chats.type";
import supabase from "./supabase";

export async function getDataOfChats(
  id: string
): Promise<ChatMessageType[] | null> {
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
  newRow: Omit<ChatMessageType, "message_id">
): Promise<ChatMessageType[] | null> {
  const { data, error } = await supabase.from("Chats").insert(newRow).select();

  if (error) {
    console.error(error);
    throw new Error("Error inserting message");
  }

  return data;
}

export async function updateChat(
  newRow: Pick<ChatMessageType, "message_id"> & Partial<ChatMessageType>
): Promise<ChatMessageType[] | null> {
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
