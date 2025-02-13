import { AVATAR_IMAGES } from "../config/constants";
import { supabase } from "./client";
import { uploadAvatarImage } from "./storage";
import { validateInputs } from "../util/validate";
import { getUserByUsername } from "./shared";
import { firstLogin, fullNameNotValid, userNotFoundError } from "./errorObj";

export let getAuthUser = async () => (await supabase.auth.getUser()).data.user;

export async function isFollow(userId) {
  let currentUser = await getAuthUser();

  if (!currentUser) return false;

  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("follower_id", currentUser.id)
    .eq("following_id", userId)
    .maybeSingle();

  if (error) throw error;

  return !!data;
}

export async function follow(userId) {
  let currentUser = await getAuthUser();

  if (!currentUser) throw firstLogin;

  let { error } = await supabase
    .from("followers")
    .insert({ follower_id: currentUser.id, following_id: userId });

  if (error) throw error;

  return { success: true };
}

export async function unFollow(userId) {
  let currentUser = await getAuthUser();

  if (!currentUser) throw firstLogin;

  let { error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", currentUser.id)
    .eq("following_id", userId);

  if (error) throw error;

  return { success: true };
}

export async function toggleFollow(username) {
  let user = await getUserByUsername(username);

  let isFollows = await isFollow(user.id);

  if (isFollows) {
    let unFollowRes = await unFollow(user.id);

    if (unFollowRes.success) {
      return { success: true };
    }
  } else {
    let followRes = await follow(user.id);

    if (followRes.success) {
      return { success: true };
    }
  }
}

async function changeFullName(username, value) {
  let response = validateInputs("fullName", value);

  if (response) throw fullNameNotValid;

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

export async function userPagebyUsername(username) {
  const { data, error } = await supabase.rpc("get_user_details_with_books", {
    target_username: username,
  });

  if (error) throw error;

  if (!data[0]) throw userNotFoundError;

  return { success: true, data: data[0] };
}
