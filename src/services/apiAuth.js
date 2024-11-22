import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);

  return data;
}

export async function signup({ email, password, name }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: "",
      },
    },
  });

  if (error) {
    throw (new Error(error.message), console.log(error.message));
  }
  console.log(data);

  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  console.log(session.session);

  const { data, error } = await supabase.auth.getUser();

  await supabase
    .from("User")
    .insert({
      id: data?.user.id,
      name: data?.user.user_metadata.name,
      avatar: data?.user.user_metadata.avatar,
    })
    .select();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
// export async function updateCurrentUser({ password, name, avatar }) {
//   let updateData;
//   if (password) updateData = { password };
//   if (name) updateData = { data: { name } };
//   const { data: hh, error } = await supabase.auth.updateUser(name);
//   if (error) throw new Error(error.message);
//   if (!avatar) return hh;

//   const fileName = `avatar-${data.user.id}-${Math.random()}`;
//   const { error: storageError } = await supabase.storage
//     .from("avatar")
//     .update(fileName, avatar);

//   if (storageError) throw new Error(storageError.message);
//   const { data: updateUser, error: error2 } = supabase.auth.updateUser({
//     data: {
//       avatar: `https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/avatar/${fileName}`,
//     },
//   });
//   if (error2) throw new Error(error2.message);
//   return updateUser;
// }
export async function updateCurrentUser(newRow) {
  const fileName =
    `avatar-gg${Math.random()}sgigiusgiugsiugsugsiugsiug`.replaceAll("/", "");

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, newRow.image);

  if (storageError) throw new Error(storageError.message);

  const { data: updateUser, error: error2 } = supabase.auth.updateUser({
    data: {
      name: newRow.name,
      avatar: `https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/avatar/${fileName}`,
    },
  });
  await supabase
    .from("User")
    .update({
      name: newRow.name,
      avatar: `https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/avatar/${fileName}`,
    })
    .eq("id", newRow.id);

  if (error2) throw new Error(error2.message);
  return updateUser;
}

export async function trackUserPresence(userId) {
  console.log(userId);

  const channel = supabase.channel(`online-users`, {
    config: {
      presence: {
        key: userId,
      },
    },
  });

  let onlineUsersCount = 0; // عداد المستخدمين المتصلين

  // الاشتراك في القناة
  await channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      console.log(`تم الاشتراك في القناة`);
      await channel.track({ userId });
    }
  });

  return new Promise((resolve) => {
    // مراقبة انضمام المستخدمين
    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      onlineUsersCount += newPresences.length; // زيادة العدد
      console.log(`عدد المستخدمين المتصلين: ${onlineUsersCount}`);
      resolve(onlineUsersCount); // إرجاع العدد
    });

    // مراقبة مغادرة المستخدمين
    channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
      onlineUsersCount -= leftPresences.length; // تقليل العدد
      console.log(`عدد المستخدمين المتصلين: ${onlineUsersCount}`);
      resolve(onlineUsersCount); // إرجاع العدد
    });

    // في حال لم يحدث أي تغيير خلال المهلة، إرجاع العدد الحالي
    // setTimeout(() => resolve(onlineUsersCount), 1000);
  });
}
