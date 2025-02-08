import { AVATAR_IMAGES } from "../config/constants";
import { supabase } from "./client";
import { uploadAvatarImage } from "./storage";
import { validateInputs } from "../util/validate";
import { getUserByUsername, getUsersByUsername } from "./shared";

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

export async function checkIfFollowing(userUsername, targetUsername) {
  let {
    users: [firstUser, secondUser],
  } = getUsersByUsername(userUsername, targetUsername);

  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("follower_id", firstUser.id)
    .eq("following_id", secondUser.id)
    .maybeSingle();

  if (error) throw error;

  return {
    success: true,
    data: {
      fullName: secondUser.full_name,
      avatarUrl: secondUser.avatar_url,
      isFollow: !!data,
    },
  };
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

async function changeAvatar(username, fileData) {
  let { file, fileName } = fileData;

  let fileExtention = fileName.split(".").pop();
  let imageName = [username, fileExtention].join(".");
  let imageUrl = AVATAR_IMAGES + imageName;
  await uploadAvatarImage(file, imageName);
  const { error } = await supabase
    .from("users")
    .update({ avatar_url: imageUrl })
    .eq("username", username);

  if (error) throw error;

  let { avatar_url } = await getUserByUsername(username);
  return { success: true, avatar_url };
}

export async function changeUserInformation(username, colName, value) {
  switch (colName) {
    case "full_name":
      return changeFullName(username, value);
    case "avatar":
      return changeAvatar(username, value);
    default:
      throw new Error("field is invalid");
  }
}
