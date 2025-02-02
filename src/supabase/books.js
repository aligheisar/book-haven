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

export async function addBook(
  userId,
  title,
  description,
  price,
  imageUrl,
  genres,
) {
  const { data, error } = await supabase.rpc("add_book_with_genres", {
    p_user_id: userId,
    p_title: title,
    p_description: description,
    p_price: price,
    p_image_url: imageUrl || null,
    p_genre_names: genres,
  });

  if (error) throw error;

  return { success: true, data, error: null };
}

export async function getGenres() {
  const { data, error } = await supabase.from("genres").select("name");

  if (error) throw error;

  return { success: true, data: data.map((i) => i.name), error: null };
}
