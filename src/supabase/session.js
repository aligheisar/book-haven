import { supabase } from "./client";

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  if (data && data.session) {
    let { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.session.user.id);
    if (userError) throw userError;
    return userData;
  }
  return null;
}
