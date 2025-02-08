import { trackUserPresence } from '@/backend/presence';
import useUser from '@/hooks/useUser';
import { useEffect } from 'react';

interface ChatComponentProps {
  onlineUsersCount: number;
  setOnlineUsersCount: React.Dispatch<React.SetStateAction<number>>;
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChatComponent = ({
  onlineUsersCount,
  setOnlineUsersCount,
  setOnlineUsers,
}: ChatComponentProps) => {
  const { user } = useUser();
  if (!user) return null;
  const userId = user.id;

  useEffect(() => {
    let unsubscribe: () => void;

    const initPresence = async () => {
      unsubscribe = await trackUserPresence(userId, (change, users) => {
        setOnlineUsersCount((prevCount) => prevCount + change);

        setOnlineUsers((prevUsers: string[]) => {
          if (change > 0) {
            return [...prevUsers, ...users];
          } else {
            return prevUsers.filter((user) => !users.includes(user));
          }
        });
      });
    };

    initPresence();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId, setOnlineUsersCount, setOnlineUsers]);

  return (
    <div className="bg-blue-100 text-blue-800 text-sm font-medium py-2 px-4 flex justify-center items-center shadow-md">
      <div>
        There are <span className="mx-1 font-bold">{onlineUsersCount}</span>{' '}
        users online now!
      </div>
    </div>
  );
};

export default ChatComponent;
