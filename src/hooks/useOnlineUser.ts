import { trackUserPresence } from '@/backend/presence';
import useUser from '@/hooks/useUser';
import { useEffect, useState, useCallback } from 'react';

interface UseOnlineUserReturn {
  onlineUsers: string[];
}

export const useOnlineUser = (): UseOnlineUserReturn  => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useUser();


  const userId = user.id;

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initPresence = async () => {
      unsubscribe = await trackUserPresence(userId, (change, users) => {
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
  }, [userId]);

  return { onlineUsers };
};
