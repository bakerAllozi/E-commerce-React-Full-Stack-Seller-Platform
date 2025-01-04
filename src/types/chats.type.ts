export interface ChatMessageType {
  icon?: {
    icon: string;
    id: string;
  };

  id?: string;
  // senderId: string;
  // receiverId: string;
  message: string;
  timestamp?: Date;
  sender_id: string;
  receiver_id: string;
  created_at?: Date;
  message_id: string;
  avatar?: string;
  name?: string;
  emoji?: string;
  is_red?: boolean;
}
