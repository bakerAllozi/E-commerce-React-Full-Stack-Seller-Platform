import { useNavigate } from "react-router-dom";
import useRedux from "../../../../hooks/useRedux";
import { showChatUser } from "../../userSlice";
import usePublicUser from "../../../../hooks/usePublicUser";
import Spinner from "../../../../ui/Spinner";
import useUser from "../../../../hooks/useUser";
import ReceiverUser from "./ReceiverUser";
import ChatComponent from "../../../../ui/ChatComponent ";
import { useState } from "react";

function MessageNotifications() {
  const { appSelector, dispatch } = useRedux();
  const { ReceiverChat } = appSelector((state) => state.UserData);
  const { user } = useUser();
  const navigate = useNavigate();
  const userId = user?.id;
  const [onlineUsersCount, setOnlineUsersCount] = useState<number>(0);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { data: ALLUserData, isLoading } = usePublicUser();

  const handleNavigate = (receiverId: string) => {
    if (!userId || !ALLUserData) return;

    const dataUser = ALLUserData.find((arr) => arr.id === receiverId);

    if (!dataUser) return;

    dispatch(
      showChatUser({
        receiverId,
        userId,
        seller_name: dataUser.name,
        avatar: dataUser.avatar,
      })
    );
    navigate(`/ChatPage`);
  };

  return (
    <div>
      <ChatComponent
        onlineUsersCount={onlineUsersCount}
        setOnlineUsersCount={setOnlineUsersCount}
        setOnlineUsers={setOnlineUsers}
      />

      {isLoading && onlineUsers.length > 0 ? (
        <Spinner />
      ) : ReceiverChat?.length > 0 ? (
        <div className="flex gap-4 justify-center flex-wrap cursor-pointer bg-gray-100 p-5 rounded-lg shadow-lg">
          {ReceiverChat?.map((e) => (
            <ReceiverUser
              key={e.sender_id}
              handleNavigate={handleNavigate}
              e={e}
              userId={`${userId}`}
              onlineUsers={onlineUsers}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">لا توجد رسائل حالياً</div>
      )}
    </div>
  );
}

export default MessageNotifications;
