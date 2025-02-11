import { supabase } from "./client";
import { firstLogin } from "./errorObj";
import { currentUser } from "./user";

export async function followUser(followingId) {
  if (!currentUser) throw firstLogin;

  const { data, error } = await supabase.from("follows").insert({
    follower_id: currentUser.id,
    following_id: followingId,
  });

  if (error) throw error;

  return data;
}

export async function getFollowers(userId) {
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("following_id", userId);
  if (error) throw error;
  return data;
}
