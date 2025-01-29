import { supabase } from "./client";
import { getUserById } from "./shared";

export async function getSession() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw sessionError;

  if (sessionData && sessionData.session) {
    let userData = await getUserById(sessionData.session.user.id);

    return {
      user: {
        fullName: userData.full_name,
        email: sessionData.session.user.email,
        username: userData.username,
        avatarUrl: userData.avatar_url,
      },
    };
  }
  return null;
}
