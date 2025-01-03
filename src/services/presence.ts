import supabase from "./supabase";

export async function trackUserPresence(
  userId: string,
  onUpdate: (change: number, users: string[]) => void
): Promise<() => void> {
  const channel = supabase.channel("online-users", {
    config: {
      presence: {
        key: userId,
      },
    },
  });

  await channel.subscribe((status: string) => {
    if (status === "SUBSCRIBED") {
      channel.track({ userId });
    }
  });

  const updatePresence = (change: number, users: string[]): void => {
    if (onUpdate) onUpdate(change, users);
  };

  const handleJoin = (event: { newPresences: { userId: string }[] }): void => {
    const users = event.newPresences.map((presence) => presence.userId);
    updatePresence(event.newPresences.length, users);
  };

  const handleLeave = (event: {
    leftPresences: { userId: string }[];
  }): void => {
    const users = event.leftPresences.map((presence) => presence.userId);
    updatePresence(-event.leftPresences.length, users);
  };

  channel.on("presence", { event: "join" }, handleJoin);
  channel.on("presence", { event: "leave" }, handleLeave);

  const unsubscribe = (): void => {
    channel.unsubscribe();
  };

  return unsubscribe;
}
