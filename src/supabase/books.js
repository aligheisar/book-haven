import { supabase } from "./client";

export async function getBooks() {
  const { data, error } = await supabase.from("books").select("*");
  if (error) throw error;
  return data;
}

export async function getBookDetails(bookId) {
  const { data, error } = await supabase
    .from("books")
    .select(
      `
            *,
            comments (
                comment, created_at, user_id
            ),
            likes (
                user_id
            )
        `,
    )
    .eq("id", bookId)
    .single();

  if (error) throw error;
  return data;
}

export async function addBook(userId, title, description, imageUrl) {
  const { data, error } = await supabase.from("books").insert({
    user_id: userId,
    title,
    description,
    image_url: imageUrl,
  });

  if (error) throw error;
  return data;
}
