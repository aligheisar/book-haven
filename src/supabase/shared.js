import { supabase } from "./client";

export async function getUserById(id) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);

  if (error) throw error;

  return data[0];
}

export async function getUserByUsername(username) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (error) throw error;

  return data[0];
}

export async function isUsernameUnique(username) {
  let response = await getUserByUsername(username);
  if (response) return false;
  else return true;
}
