import { supabase } from "./client";

export async function likeBook(userId, bookId) {
  const { data, error } = await supabase.from("likes").insert({
    user_id: userId,
    book_id: bookId,
  });

  if (error) throw error;
  return data;
}

export async function getBookLikes(bookId) {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("book_id", bookId);
  if (error) throw error;
  return data;
}
