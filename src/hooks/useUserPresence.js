import { useState, useEffect, useCallback } from "react";
import { trackUserPresence } from "../services/apiAuth"; // تأكد من أن هذه الدالة تقوم بتحديث حالة المستخدم بشكل صحيح.

const useUserPresence = (userId) => {
  const [status, setStatus] = useState("غير معروف");

  const updateStatus = useCallback((newStatus) => {
    setStatus(newStatus);
  }, []);

  useEffect(() => {
    let channel;

    const subscribeToPresence = async () => {
      channel = await trackUserPresence(userId, updateStatus);
    };

    subscribeToPresence();

    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [userId, updateStatus]);

  return { status };
};

export default useUserPresence;
