import { AVATAR_IMAGES } from "../config/constants";
import { supabase } from "./client";
import { uploadAvatarImage } from "./storage";
import { validateInputs } from "../util/validate";
import { getUserByUsername } from "./shared";

export const {
  data: { user: currentUser },
} = await supabase.auth.getUser();

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

export async function isFollow(userId) {
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
  let { error } = await supabase
    .from("followers")
    .insert({ follower_id: currentUser.id, following_id: userId });

  if (error) throw error;

  return { success: true };
}

export async function unFollow(userId) {
  let { error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", currentUser.id)
    .eq("following_id", userId);

  if (error) throw error;

  return { success: true };
}

// export async function checkIfFollowing(username) {
//   let user = await getUserByUsername(username);

//   let isFollows = await isFollow(user.id);

//   return {
//     success: true,
//     data: {
//       fullName: user.full_name,
//       avatarUrl: user.avatar_url,
//       isFollow: !!isFollows,
//     },
//   };
// }

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
