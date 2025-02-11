import { supabase } from "./client";
import { getAuthUser } from "./user";
import { firstLogin } from "./errorObj";

export async function addComment(bookId, content) {
  let currentUser = await getAuthUser();

  if (!currentUser) throw firstLogin;

  const { data, error } = await supabase.from("comments").insert({
    user_id: currentUser.id,
    book_id: bookId,
    content,
  });

  if (error) throw error;

  return { success: true, data };
}

export async function removeComment(commentId) {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;

  return { success: true, data };
}

export async function getComments(bookId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("book_id", bookId);
  if (error) throw error;

  return { success: true, data };
}
