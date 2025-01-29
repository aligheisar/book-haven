import { supabase } from "./client";

async function getUserById(id) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);

  if (error) throw error;

  return data;
}

async function insertUser(id, fullName, username) {
  const { error } = await supabase.from("users").insert({
    id,
    username,
    full_name: fullName,
  });

  if (error) throw error;
}

export async function register(email, password, fullName, username) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  const userId = authData.user.id;

  insertUser(userId, fullName, username);

  let { avatar_url } = getUserById(userId);

  return {
    user: {
      fullName,
      email,
      username,
      avatarUrl: avatar_url,
    },
  };
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  let { userId } = data.user.id;

  let { avatar_url, full_name, username } = getUserById(userId);

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
