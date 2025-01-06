import { ChatMessageType } from '@/types/chats.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface forHowYouChatType {
  id?: string;
  name: string;
  avatar: string;
}
interface ProductToEditType {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  color: {
    color1: string;
    color2: string;
  };
  piecesRemaining: number;
  rating: {
    rate: number;
    count: number;
  };
}
interface InitialStateType {
  ProductToEdit: ProductToEditType | any;
  Senders: ChatMessageType[];
  newMassage: ChatMessageType[];
  SenderChat: ChatMessageType[];
  ReceiverChat: ChatMessageType[];
  dataChats: ChatMessageType[];
  NewDataChats: ChatMessageType[];
  forHowYouChat: forHowYouChatType;
  ChatUser: ChatMessageType[];
  AllChat: ChatMessageType[];
}

const initialState: InitialStateType = {
  ProductToEdit: null,
  Senders: [],
  newMassage: [],
  SenderChat: [],
  ReceiverChat: [],
  dataChats: [],
  NewDataChats: [],
  forHowYouChat: {
    name: '',
    avatar: '',
  },
  ChatUser: [],
  AllChat: [],
};

const wishlistReducer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setProductToEdit(state, action) {
      state.ProductToEdit = action.payload;
    },
    getDataChats(state, action) {
      state.dataChats = action.payload;
    },
    setNewAvatarUser(state, action) {
      const updatedChats = state.dataChats.map((chat) => {
        const match = action.payload.find(
          (r: ChatMessageType) => chat.sender_id === r.id
        );
        return match ? { ...chat, ...match } : chat;
      });
      state.NewDataChats = [...updatedChats];
    },
    splitDataChat(state, action) {
      const combinedChats = state.NewDataChats?.reduce(
        (acc, chat) => {
          if (
            acc.ReceiverChat.findIndex(
              (t) => t.sender_id === chat.sender_id
            ) === -1
          ) {
            acc.ReceiverChat.push(chat);
          }

          if (
            acc.SenderChat.findIndex(
              (t: ChatMessageType) => t.sender_id === chat.sender_id
            ) === -1 &&
            chat.sender_id === action.payload
          ) {
            acc.SenderChat.push(chat);
          }

          return acc;
        },
        {
          SenderChat: [] as ChatMessageType[],
          ReceiverChat: [] as ChatMessageType[],
        }
      );

      state.SenderChat = combinedChats.SenderChat;
      state.ReceiverChat = combinedChats.ReceiverChat;
      state.AllChat = [
        ...combinedChats.SenderChat,
        ...combinedChats.ReceiverChat,
      ];
    },
    showChatUser(
      state,
      action: PayloadAction<{
        receiverId: string;
        userId: string;
        seller_name: string;
        avatar: string;
      }>
    ) {
      const data = state.dataChats.filter(
        (arr: ChatMessageType) =>
          arr.sender_id === action.payload.receiverId ||
          arr.receiver_id === action.payload.receiverId
      );
      state.ChatUser = data.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      state.forHowYouChat = {
        id: action.payload.receiverId,
        name: action.payload.seller_name,
        avatar: action.payload.avatar || '',
      };
    },
  },
});

export default wishlistReducer.reducer;
export const {
  setProductToEdit,
  getDataChats,
  showChatUser,
  setNewAvatarUser,
  splitDataChat,
} = wishlistReducer.actions;
