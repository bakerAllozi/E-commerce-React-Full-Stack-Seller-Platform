// src/services/presence.js

import supabase from "./supabase";

export async function trackUserPresence(userId, onUpdate) {
  const channel = supabase.channel("online-users", {
    config: {
      presence: {
        key: userId, // المفتاح الذي يميز كل مستخدم
      },
    },
  });

  // الاشتراك في القناة
  await channel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      console.log("تم الاشتراك في القناة");
      channel.track({ userId }); // تأكد من أن المستخدم يُتتبع
    }
  });

  let updatedCount = 0;

  const updateCount = (change) => {
    updatedCount += change;
    console.log(`عدد المستخدمين المتصلين: ${updatedCount}`);
    if (onUpdate) onUpdate(updatedCount); // استدعاء الدالة الممررة
  };

  // مراقبة انضمام المستخدمين
  const handleJoin = ({ newPresences }) => updateCount(newPresences.length);

  // مراقبة مغادرة المستخدمين
  const handleLeave = ({ leftPresences }) => updateCount(-leftPresences.length);

  channel.on("presence", { event: "join" }, handleJoin);
  channel.on("presence", { event: "leave" }, handleLeave);

  // وظيفة لإلغاء الاشتراك عند الحاجة
  const unsubscribe = () => {
    channel.off("presence", { event: "join" }, handleJoin);
    channel.off("presence", { event: "leave" }, handleLeave);
    channel.unsubscribe();
    console.log("تم إلغاء الاشتراك في القناة");
  };

  return unsubscribe; // إرجاع وظيفة الإلغاء فقط
}
