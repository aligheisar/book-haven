import { supabase } from "./client";

export async function uploadImage(bucket, file, fileName) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);
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
