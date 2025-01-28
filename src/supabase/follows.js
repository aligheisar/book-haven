import { supabase } from "./client";

export async function followUser(followerId, followingId) {
  const { data, error } = await supabase.from("follows").insert({
    follower_id: followerId,
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
