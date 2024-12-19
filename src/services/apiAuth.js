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

  const { data, error: fetchError } = await supabase
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
  try {
    let avatarUrl;
    if (newRow.image) {
      const fileName = `avatar-${Math.random().toString(36).substring(2, 15)}`;

      const { error: storageError } = await supabase.storage
        .from("avatar")
        .upload(fileName, newRow.image);

      if (storageError)
        throw new Error(`Storage error: ${storageError.message}`);

      avatarUrl = `https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/avatar/${fileName}`;
    }

    const updateData = {
      data: {
        name: newRow.name,
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      ...(newRow.password && { password: newRow.password }),
    };

    const { data: updateUser, error: authError } =
      await supabase.auth.updateUser(updateData);

    if (authError) throw new Error(`Auth error: ${authError.message}`);

    const dbUpdate = {
      name: newRow.name,
      ...(avatarUrl && { avatar: avatarUrl }),
    };

    const { error: dbError } = await supabase
      .from("User")
      .update(dbUpdate)
      .eq("id", newRow.id);

    if (dbError) throw new Error(`Database error: ${dbError.message}`);

    return updateUser;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
}
