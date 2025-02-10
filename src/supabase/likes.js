import { getBookByTitle } from "./books";
import { supabase } from "./client";
import { bookNotFoundError, somethingHappend } from "./errorObj";
import { getUserByUsername } from "./shared";
import { currentUser } from "./user";

export async function isLiked(bookId) {
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
  const { error } = await supabase.from("likes").insert({
    user_id: currentUser.id,
    book_id: bookId,
  });

  if (error) throw error;

  return { success: true };
}

async function unLikeBook(bookId) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", currentUser.id)
    .eq("book_id", bookId);

  if (error) throw error;

  return { success: true };
}

export async function toggleLike(username, bookTitle) {
  let user = await getUserByUsername(username);

  let { data: book } = await getBookByTitle(user.id, bookTitle);

  if (!book) throw bookNotFoundError;

  let isLikedFlag = await isLiked(book.id);

  if (isLikedFlag) {
    let { success } = await unLikeBook(book.id);
    if (success) {
      return { result: false };
    }
  } else {
    let { success } = await likeBook(book.id);
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
