import { supabase } from "./client";

export async function uploadBookImage(file, fileName) {
  const { data, error } = await supabase.storage
    .from("book-images")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  return { success: true, data, error: null };
}

export async function uploadAvatarImage(file, fileName) {
  const { error, data } = await supabase.storage
    .from("avatar-images")
    .update(fileName, file, {
      upsert: true,
    });
  if (error) throw error;
  return data;
}

export async function getImageUrl(bucket, fileName) {
  const { publicURL, error } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);
  if (error) throw error;
  return publicURL;
}
