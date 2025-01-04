import useRedux from "../../../../hooks/useRedux";
import useUser from "../../../../hooks/useUser";
import useUpdateChat from "../../../../hooks/useUpdateChat";
import { IoCheckmarkDone } from "react-icons/io5";
import { useEffect } from "react";
import { ChatMessageType } from "@/types/chats.type";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function ChatMassage() {
  const { appSelector } = useRedux();
  const { ChatUser, forHowYouChat } = appSelector((state) => state.UserData);
  const { user } = useUser();
  const { updateChatsById } = useUpdateChat();
  const newMessages = ChatUser?.filter(
    (arr: ChatMessageType) => arr.is_red !== true
  );
  const handleAddEmoji = (newEmoji: { icon: string; id: string }) => {
    updateChatsById({ emoji: newEmoji.icon, message_id: newEmoji.id });
  };

  useEffect(() => {
    if (newMessages.length > 0 && user?.id !== newMessages[0].sender_id) {
      newMessages.forEach((message) => {
        updateChatsById({ ...message, is_red: true });
      });
    }
  }, [ChatUser]);

  return (
    <div>
      <p className="font-bold text-2xl text-center mb-4 text-gray-500 ">
        chatting with {forHowYouChat?.name}
      </p>
      <div className="flex-grow overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner h-[50vh]">
        {ChatUser?.map((msg) => (
          <div
            className={`flex ${
              msg.sender_id === user?.id ? "justify-end" : "justify-start"
            } mb-4`}
            key={msg.message_id}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow group/item  relative  ${
                msg.sender_id === user?.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {user?.id === msg.sender_id || (
                <div className="absolute bottom-2 right-2 invisible group-hover/item:visible bg-white w-28 h-8 rounded-lg flex justify-around items-center">
                  <ReactEmoji
                    msg={msg}
                    handleAddEmoji={handleAddEmoji}
                    icon="❤️"
                  />
                  <ReactEmoji
                    msg={msg}
                    handleAddEmoji={handleAddEmoji}
                    icon="👍"
                  />
                  <ReactEmoji
                    msg={msg}
                    handleAddEmoji={handleAddEmoji}
                    icon="😂"
                  />
                  <ReactEmoji
                    msg={msg}
                    handleAddEmoji={handleAddEmoji}
                    icon="😮"
                  />
                  <ReactEmoji
                    msg={msg}
                    handleAddEmoji={handleAddEmoji}
                    icon="😢"
                  />
                </div>
              )}
              <p
                className={` absolute top-2 right-2 ${
                  msg.is_red ? "text-blue-500" : "text-white"
                } `}
              >
                <IoCheckmarkDone />
              </p>
              <p
                className={` bg-slate-500  text-[15px]  absolute bottom-[-15px] right-2 rounded-full ${
                  msg?.emoji && " p-[2px]"
                } w-fit`}
              >
                {msg?.emoji}
              </p>
              <p className="font-semibold">{msg.message}</p>
              <p className="text-xs mt-2">
                {msg.created_at
                  ? `${new Date(msg.created_at).toLocaleString()}`
                  : "Invalid date"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ReactEmoji = ({
  icon,
  handleAddEmoji,
  msg,
}: {
  icon: IconProp | string;
  handleAddEmoji: (newEmoji: { icon: string; id: string }) => void;
  msg: ChatMessageType;
}) => {
  const nweIcon =
    typeof icon === "string" ? (icon === msg.emoji ? "" : icon) : "";
  return (
    <p
      onClick={() => handleAddEmoji({ icon: nweIcon, id: msg.message_id })}
      className="cursor-pointer hover:mb-2"
    >
      {nweIcon}
    </p>
  );
};

export default ChatMassage;
