import { supabase } from "./client";

export async function addComment(userId, bookId, comment) {
  const { data, error } = await supabase.from("comments").insert({
    user_id: userId,
    book_id: bookId,
    comment,
  });

  if (error) throw error;
  return data;
}

export async function getComments(bookId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("book_id", bookId);
  if (error) throw error;
  return data;
}
