import { trackUserPresence } from '@/backend/presence';
import useUser from '@/hooks/useUser';
import { useEffect, useState, useCallback } from 'react';

interface UseOnlineUserReturn {
  onlineUsers: string[];
}

  const useOnlineUser = (): UseOnlineUserReturn  => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useUser();


  const userId = user?.id;

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initPresence = async () => {
      if (userId) {
        unsubscribe = await trackUserPresence(userId, (change, users) => {
          setOnlineUsers((prevUsers: string[]) => {
            if (change > 0) {
              return [...prevUsers, ...users];
            } else {
              return prevUsers.filter((user) => !users.includes(user));
            }
          });
        });
      }
    };

    if (userId) {
      initPresence();
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId]);

  return { onlineUsers };
};
export default useOnlineUser;
