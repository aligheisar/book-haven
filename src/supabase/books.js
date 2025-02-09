import { supabase } from "./client";
import { BOOK_IMAGES } from "../config/constants";
import { getUserByUsername } from "./shared";
import { uploadBookImage } from "./storage";
import { isLiked } from "./likes";
import { isFollow } from "./user";

export async function getBooks() {
  const { data, error } = await supabase.from("books").select("*");
  if (error) throw error;
  return data;
}

export async function getBookByTitle(userId, title) {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .ilike("title", title)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  return { success: true, data };
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
            id, content, created_at,
            user:users ( username, full_name, avatar_url )
        ),
        likes ( user_id )
      `,
    )
    .eq("user_id", user.id)
    .ilike("title", title)
    .maybeSingle();

  if (error) throw error;

  delete data["user_id"];

  let isUserLiked = false;
  isUserLiked = await isLiked(data.id);

  let isUserFollow = false;
  isUserFollow = await isFollow(user.id);

  let newData = {
    ...data,
    likes: data.likes.length,
    isUserLiked,
    isUserFollow,
    user: {
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      avatar_url: user.avatar_url,
    },
  };

  return { success: true, data: newData };
}

export async function addBook(
  username,
  title,
  description,
  price,
  image,
  genres,
) {
  const { id: userId } = await getUserByUsername(username);

  const { data: checkExistData, error: checkExistError } = await supabase
    .from("books")
    .select("id")
    .eq("user_id", userId)
    .eq("title", title)
    .maybeSingle();

  if (checkExistError) throw checkExistError;

  if (checkExistData) {
    let errorObj = {
      status: "Faild to add Book",
      message: "this Book is Already exist",
    };

    throw errorObj;
  }

  let imageUrl = null;
  if (image) {
    const {
      data: { path },
    } = await uploadBookImage(image, `${username}-${title}`);
    imageUrl = path;
  }

  const { data, error } = await supabase.rpc("add_book_with_genres", {
    p_user_id: userId,
    p_title: title,
    p_description: description,
    p_price: price,
    p_image_url: image ? BOOK_IMAGES + imageUrl : null,
    p_genre_names: genres,
  });

  if (error) throw error;

  return { success: true, data };
}

export async function getGenres() {
  const { data, error } = await supabase.from("genres").select("name");

  if (error) throw error;

  return { success: true, data: data.map((i) => i.name) };
}
