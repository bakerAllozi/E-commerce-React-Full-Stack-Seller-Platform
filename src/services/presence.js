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

  const updatePresence = (change, users) => {
    if (onUpdate) onUpdate(change, users); // إرسال التغييرات وعدد المستخدمين إلى المكون
  };

  // مراقبة انضمام المستخدمين
  const handleJoin = ({ newPresences }) => {
    const users = newPresences.map((presence) => presence.userId); // الحصول على الـ ID أو أي معلومات إضافية
    updatePresence(newPresences.length, users);
  };

  // مراقبة مغادرة المستخدمين
  const handleLeave = ({ leftPresences }) => {
    const users = leftPresences.map((presence) => presence.userId); // الحصول على الـ ID أو أي معلومات إضافية
    updatePresence(-leftPresences.length, users);
  };

  channel.on("presence", { event: "join" }, handleJoin);
  channel.on("presence", { event: "leave" }, handleLeave);

  const unsubscribe = () => {
    channel.unsubscribe();
    console.log("تم إلغاء الاشتراك في القناة");
  };

  return unsubscribe;
}
