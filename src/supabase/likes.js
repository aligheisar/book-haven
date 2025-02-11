import { supabase } from "./client";
import { bookNotFoundError, firstLogin, somethingHappend } from "./errorObj";
import { getAuthUser } from "./user";

export async function isLiked(bookId) {
  let currentUser = await getAuthUser();

  if (!currentUser) return false;

  const { data, error } = await supabase
    .from("likes")
    .select("user_id, book_id")
    .eq("user_id", currentUser.id)
    .eq("book_id", bookId)
    .maybeSingle();

  if (error) throw error;

  return data ? true : false;
}

async function likeBook(bookId) {
  let currentUser = await getAuthUser();

  if (!currentUser) throw firstLogin;

  const { error } = await supabase.from("likes").insert({
    user_id: currentUser.id,
    book_id: bookId,
  });

  if (error) throw error;

  return { success: true };
}

async function unLikeBook(bookId) {
  let currentUser = await getAuthUser();

  if (!currentUser) throw firstLogin;

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", currentUser.id)
    .eq("book_id", bookId);

  if (error) throw error;

  return { success: true };
}

export async function toggleLike(bookId) {
  if (!bookId) throw bookNotFoundError;

  let isLikedFlag = await isLiked(bookId);

  if (isLikedFlag) {
    let { success } = await unLikeBook(bookId);
    if (success) {
      return { result: false };
    }
  } else {
    let { success } = await likeBook(bookId);
    if (success) {
      return { result: true };
    }
  }

  throw somethingHappend;
}

export async function getBookLikes(bookId) {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("book_id", bookId);
  if (error) throw error;
  return data;
}
