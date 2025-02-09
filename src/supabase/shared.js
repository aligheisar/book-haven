import { getBookByTitle } from "./books";
import { supabase } from "./client";
import { bookNotFoundError, userNotFoundError } from "./errorObj";

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

export async function getUsersByUsername(firstUsername, secondUsername) {
  const [firstUser, secondUser] = await Promise.all([
    getUserByUsername(firstUsername),
    getUserByUsername(secondUsername),
  ]);

  if (!firstUsername || !secondUsername) {
    throw userNotFoundError;
  }

  return { success: true, users: [firstUser, secondUser] };
}

export async function isUsernameUnique(username) {
  let response = await getUserByUsername(username);
  if (response) return false;
  else return true;
}
