import { supabase } from "./client";

export async function getUserById(id) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);

  if (error) throw error;

  return data[0];
}
