import { useNavigate } from "react-router-dom";
import useRedux from "../../../../hooks/useRedux";
import { showChatUser } from "../../userSlice";
import usePublicUser from "../../../../hooks/usePublicUser";
import Spinner from "../../../../ui/Spinner";
import useUser from "../../../../hooks/useUser";
import ReceiverUser from "./ReceiverUser";
import useOnlineUsersCount from "../../../../hooks/useOnlineUsersCount";
import { useEffect } from "react";

function MessageNotifications() {
  const { appSelector, dispatch } = useRedux();
  const { ReceiverChat } = appSelector((state) => state.UserData);
  const { user } = useUser();
  const navigate = useNavigate();
  const userId = user?.id;
  const { data: ALLUserData, isLoading } = usePublicUser();
  const { onlineUsersCount, isLoading: Loading } = useOnlineUsersCount(userId);
  useEffect(() => {
    console.log("okkkkkkkkkkkkkkk", onlineUsersCount);
  }, [onlineUsersCount]);
  const handleNavigate = (receiverId) => {
    if (!userId || !ALLUserData) return; // تأكد من وجود بيانات المستخدمين

    const dataUser = ALLUserData.find((arr) => arr.id === receiverId);

    if (!dataUser) return; // التأكد من أن المستخدم موجود في البيانات

    dispatch(showChatUser(receiverId, userId, dataUser.name, dataUser.avatar));
    navigate(`/ChatPage`);
  };

  return (
    <div>
      {isLoading ? ( // عرض الـ Spinner أثناء تحميل البيانات
        <Spinner />
      ) : ReceiverChat?.length > 0 ? (
        <div className="flex gap-4 justify-center flex-wrap cursor-pointer bg-gray-100 p-5 rounded-lg shadow-lg">
          {ReceiverChat?.map((e) => (
            <ReceiverUser
              key={e.sender_id}
              handleNavigate={handleNavigate}
              e={e}
              userId={userId}
              onlineUsersCount={onlineUsersCount}
              isLoading={Loading}
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
