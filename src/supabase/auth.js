import { supabase } from "./client";
import { getUserById, isUsernameUnique } from "./shared";
async function insertUser(id, fullName, username) {
  const { error } = await supabase.from("users").insert({
    id,
    username,
    full_name: fullName,
  });

  if (error) throw error;
}

export async function register(email, password, fullName, username) {
  let isUnique = await isUsernameUnique(username);

  let errorObj = {
    status: "invadid Username",
    code: "this Username is Already tooken",
  };

  if (!isUnique) throw errorObj;
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  const userId = authData.user.id;

  insertUser(userId, fullName, username);

  let { avatar_url } = await getUserById(userId);

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
