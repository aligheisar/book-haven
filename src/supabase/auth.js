import { supabase } from "./client";
import { getUserById } from "./shared";

async function insertUser(id, username, fullName, email) {
  const { error } = await supabase.from("users").insert({
    id,
    username,
    full_name: fullName,
    email,
  });

  if (error) throw error;

  return { success: true };
}

export async function register(email, password, username, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;

  await supabase.auth.getSession();

  let insertRes = await insertUser(data.user.id, username, fullName, email);
  if (insertRes.error) throw insertRes.error;

  return {
    user: {
      email,
      username,
      fullName,
      avatarUrl:
        "https://hxcipahuobjiwjhnfrsa.supabase.co/storage/v1/object/public/avatar-images//avatar_placeholder.jpg",
    },
  };
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  let { avatar_url, full_name, username } = await getUserById(data.user.id);

  return {
    user: {
      fullName: full_name,
      email,
      username,
      avatarUrl: avatar_url,
    },
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
