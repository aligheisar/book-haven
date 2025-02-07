import { supabase } from "./client";
import { BOOK_IMAGES } from "../config/constants";
import { getUserByUsername } from "./shared";
import { uploadBookImage } from "./storage";

export async function getBooks() {
  const { data, error } = await supabase.from("books").select("*");
  if (error) throw error;
  return data;
}

export async function getBooksByUsername(username) {
  let user = await getUserByUsername(username);

  const { data, error } = await supabase
    .from("books")
    .select("id, title, price, image_url")
    .eq("user_id", user.id);

  if (error) throw error;

  return {
    success: true,
    data: data.map((i) => ({
      id: i.id,
      title: i.title,
      price: i.price,
      image_url: i.image_url,
      full_name: user.full_name,
      username: user.username,
    })),
    error: null,
  };
}

export async function getBookDetails(username, title) {
  let user = await getUserByUsername(username);

  if (!user) {
    return { success: false, data: null, error: "User not found" };
  }

  const { data, error } = await supabase
    .from("books")
    .select(
      `
        id, title, description, price, image_url, user_id,
        comments (
            content, created_at, user_id
        ),
        likes (
            user_id
        )
      `,
    )
    .eq("user_id", user.id)
    .ilike("title", title)
    .maybeSingle();

  if (error) return { success: false, data: null, error };

  return { success: true, data, error: null };
}

export async function addBook(
  username,
  title,
  description,
  price,
  image,
  genres,
) {
  let imageUrl = null;
  if (image) {
    const {
      data: { path },
    } = await uploadBookImage(image, `${username}-${title}`);
    imageUrl = path;
  }

  const { id: userId } = await getUserByUsername(username);

  const { data, error } = await supabase.rpc("add_book_with_genres", {
    p_user_id: userId,
    p_title: title,
    p_description: description,
    p_price: price,
    p_image_url: image ? BOOK_IMAGES + imageUrl : null,
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
