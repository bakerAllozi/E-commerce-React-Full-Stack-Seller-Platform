import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ProductToEdit: "",
  Senders: [],
  newMassage: [],
  SenderChat: [],
  ReceiverChat: [],
  dataChats: [],
  NewDataChats: [],
  forHowYouChat: {},
  ChatUser: [],
  AllChat: [],
};
const wishlistReducer = createSlice({
  name: "User",
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
        const match = action.payload.find((r) => chat.sender_id === r.id);
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
            acc.SenderChat.findIndex((t) => t.sender_id === chat.sender_id) ===
              -1 &&
            chat.sender_id === action.payload
          ) {
            acc.SenderChat.push(chat);
          }

          return acc;
        },
        { SenderChat: [], ReceiverChat: [] }
      );

      state.SenderChat = combinedChats.SenderChat;
      state.ReceiverChat = combinedChats.ReceiverChat;

      state.SenderChat = combinedChats.SenderChat;
      state.ReceiverChat = combinedChats.ReceiverChat;
      state.AllChat = [
        ...combinedChats.SenderChat,
        ...combinedChats.ReceiverChat,
      ];
    },

    showChatUser: {
      prepare(receiverId, userId, seller_name, avatar) {
        return {
          payload: {
            receiverId,
            userId,
            seller_name,
            avatar,
          },
        };
      },
      reducer(state, action) {
        const data = state.dataChats.filter(
          (arr) =>
            arr.sender_id === action.payload.receiverId ||
            arr.receiver_id === action.payload.receiverId
        );
        state.ChatUser = data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        state.forHowYouChat = {
          id: action.payload.receiverId,
          name: action.payload.seller_name,
          avatar: action.payload.avatar,
        };
      },
    },
  },
});

export default wishlistReducer.reducer;
export const {
  setProductToEdit,
  getDataChats,
  showChatUser,
  setDataChat,
  splitDataChat,
  setNewAvatarUser,
} = wishlistReducer.actions;
