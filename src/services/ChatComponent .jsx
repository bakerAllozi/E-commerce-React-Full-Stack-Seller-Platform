import { useEffect, useState } from "react";
import { trackUserPresence } from "./presence";
import useUser from "../hooks/useUser";

const ChatComponent = () => {
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const { user } = useUser();
  const userId = user.id;

  useEffect(() => {
    let unsubscribe;

    const initPresence = async () => {
      unsubscribe = await trackUserPresence(userId, setOnlineUsersCount);
    };

    initPresence();

    // تنظيف عند إلغاء الاشتراك
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId]);

  return <p>عدد المستخدمين المتصلين: {onlineUsersCount}</p>;
};

export default ChatComponent;
