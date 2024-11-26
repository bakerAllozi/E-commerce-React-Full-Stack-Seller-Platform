// src/components/ChatComponent.js
import { useEffect, useState } from "react";
import { trackUserPresence } from "../services/presence";
import useUser from "../hooks/useUser";

const ChatComponent = () => {
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useUser();
  const userId = user.id;

  useEffect(() => {
    let unsubscribe;

    const initPresence = async () => {
      unsubscribe = await trackUserPresence(userId, (change, users) => {
        setOnlineUsersCount((prevCount) => prevCount + change); // تحديث عدد المستخدمين المتصلين
        setOnlineUsers((prevUsers) => {
          if (change > 0) {
            // إضافة المستخدمين الجدد إذا انضموا
            return [...prevUsers, ...users];
          } else {
            // إزالة المستخدمين الذين غادروا
            return prevUsers.filter((user) => !users.includes(user));
          }
        }); // تحديث قائمة المستخدمين المتصلين
      });
    };

    initPresence();

    return () => {
      if (unsubscribe) unsubscribe(); // إلغاء الاشتراك عند مغادرة الصفحة
    };
  }, [userId]);

  return (
    <div className="bg-blue-100 text-blue-800 text-sm font-medium py-2 px-4 flex justify-center items-center shadow-md">
      <div>
        There are <span className="mx-1 font-bold">{onlineUsersCount}</span>{" "}
        users online now!
      </div>
      <div>
        {/* عرض قائمة المستخدمين المتصلين */}
        <p className="mt-2">Users Online:</p>
        <ul>
          {onlineUsers.map((userId, index) => (
            <li key={index}>{userId}</li> // عرض ID المستخدم المتصل
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatComponent;
