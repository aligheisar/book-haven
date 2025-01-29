import { supabase } from "./client";

export async function getSession() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw sessionError;

  if (sessionData && sessionData.session) {
    let { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", sessionData.session.user.id);

    if (userError) throw userError;

    return {
      fullName: userData.full_name,
      email: sessionData.session.user.email,
      username: userData.username,
      avatarUrl: userData.avatar_url,
    };
  }
  return null;
}
