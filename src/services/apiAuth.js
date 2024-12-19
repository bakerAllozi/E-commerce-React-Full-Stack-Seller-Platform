import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

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
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);

  const { error: fetchError } = await supabase
    .from("User")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  if (fetchError) {
    const { error: insertError } = await supabase.from("User").insert({
      id: userData.user.id,
      name: userData.user.user_metadata.name,
      avatar: userData.user.user_metadata.avatar,
    });

    if (insertError) throw new Error(insertError.message);
  }

  return userData.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, name, avatar }) {
  try {
    let updateData = {};
    if (password) updateData.password = password;
    if (name) updateData.data = { name };

    const { data: userData, error: userError } = await supabase.auth.updateUser(
      updateData
    );
    if (userError) throw new Error(userError.message);

    if (!avatar) return userData;

    const fileName = `avatar-${userData.user.id}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    const { error: storageError } = await supabase.storage
      .from("avatar")
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    const avatarUrl = `https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/avatar/${fileName}`;
    const { data: updatedUser, error: updateError } =
      await supabase.auth.updateUser({
        data: { avatar: avatarUrl },
      });

    if (updateError) throw new Error(updateError.message);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
}
