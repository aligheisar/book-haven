import { AVATAR_IMAGES } from "../config/constants";
import { supabase } from "./client";
import { uploadAvatarImage } from "./storage";
import { validateInputs } from "../util/validate";

///!!!!!!
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function checkIfFollowing(followerId, followingId) {
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", followerId)
    .eq("following_id", followingId);

  if (error) throw error;
  return data.length > 0;
}

async function changeFullName(username, value) {
  let response = validateInputs("fullName", value);

  if (response) {
    let error = {
      status: "Faild",
      message: "full name is not valid",
    };

    throw error;
  }

  const { data, error } = await supabase
    .from("users")
    .update({ full_name: value })
    .eq("username", username);

  if (error) throw error;

  return { success: true, data, error };
}

async function changeUsername(username, value) {
  const { data, error } = await supabase
    .from("users")
    .update({ username: value })
    .eq("username", username);

  if (error) throw error;

  return { success: true };
}

async function changeAvatar(username, fileData) {
  let { file, fileName } = fileData;

  let fileExtention = fileName.split(".").pop();
  let imageName = [username, fileExtention].join(".");
  let imageUrl = AVATAR_IMAGES + imageName;
  await uploadAvatarImage(file, imageName);
  const { data, error } = await supabase
    .from("users")
    .update({ avatar_url: imageUrl })
    .eq("username", username);

  if (error) throw error;

  return { success: true, data, error };
}

export async function changeUserInformation(username, colName, value) {
  switch (colName) {
    case "full_name":
      return changeFullName(username, value);
    case "username":
      return changeUsername(username, value);
    case "avatar":
      return changeAvatar(username, value);
    default:
      throw new Error("field is invalid");
  }
}
