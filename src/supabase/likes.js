import { getBookByTitle } from "./books";
import { supabase } from "./client";
import { bookNotFoundError } from "./errorObj";
import { getUserByUsername, getUsersByUsername } from "./shared";

export async function isLiked(userId, bookId) {
  const { data, error } = await supabase
    .from("likes")
    .select("user_id, book_id")
    .eq("user_id", userId)
    .eq("book_id", bookId)
    .maybeSingle();

  if (error) throw error;

  return data ? true : false;
}

export async function isLikedByUsername(username, bookTitle) {
  let user = await getUserByUsername(username);

  let { data: book } = await getBookByTitle(user.id, bookTitle);

  if (!book) throw bookNotFoundError;

  return await isLiked(user.id, book.id);
}

async function likeBook(userId, bookId) {
  const { error } = await supabase.from("likes").insert({
    user_id: userId,
    book_id: bookId,
  });

  if (error) throw error;

  return { success: true };
}

async function unLikeBook(userId, bookId) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", userId)
    .eq("book_id", bookId);

  if (error) throw error;

  return { success: true };
}

export async function toggleLike(username, targetUrername, bookTitle) {
  let {
    users: [firstUser, secondUser],
  } = await getUsersByUsername(username, targetUrername);

  let { data: book } = await getBookByTitle(secondUser.id, bookTitle);

  if (!book) throw bookNotFoundError;

  let isLikedFlag = await isLiked(firstUser.id, book.id);

  if (isLikedFlag) {
    let { success } = await unLikeBook(firstUser.id, book.id);
    if (success) {
      return { result: false };
    }
  } else {
    let { success } = await likeBook(firstUser.id, book.id);
    if (success) {
      return { result: true };
    }
  }
}

export async function getBookLikes(bookId) {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("book_id", bookId);
  if (error) throw error;
  return data;
}
