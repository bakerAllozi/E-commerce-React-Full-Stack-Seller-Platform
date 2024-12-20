import supabase from "./supabase";

export async function trackUserPresence(userId, onUpdate) {
  const channel = supabase.channel("online-users", {
    config: {
      presence: {
        key: userId,
      },
    },
  });

  await channel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      channel.track({ userId });
    }
  });

  const updatePresence = (change, users) => {
    if (onUpdate) onUpdate(change, users);
  };

  const handleJoin = ({ newPresences }) => {
    const users = newPresences.map((presence) => presence.userId);
    updatePresence(newPresences.length, users);
  };

  const handleLeave = ({ leftPresences }) => {
    const users = leftPresences.map((presence) => presence.userId);
    updatePresence(-leftPresences.length, users);
  };

  channel.on("presence", { event: "join" }, handleJoin);
  channel.on("presence", { event: "leave" }, handleLeave);

  const unsubscribe = () => {
    channel.unsubscribe();
  };

  return unsubscribe;
}
