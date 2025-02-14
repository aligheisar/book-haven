import { supabase } from "./client";
import { firstLogin } from "./errorObj";
import { getAuthUser } from "./user";

function formatNotification(data) {
  return data.map((notif) => ({
    id: notif.id,
    book: notif.book
      ? {
          title: notif.book.title,
          user: {
            username: notif.book.user.username,
          },
        }
      : null,
    seen: notif.seen,
    type: notif.type,
    sender: {
      username: notif.sender.username,
      fullName: notif.sender.full_name,
      avatarUrl: notif.sender.avatar_url,
    },
    createdAt: notif.created_at,
  }));
}

export async function getNotifications() {
  let currentUser = await getAuthUser();

  if (!currentUser) throw firstLogin;

  const { data, error } = await supabase.rpc("get_notifications_with_details");

  if (error) throw error;

  return { success: true, data: formatNotification(data) };
}

export async function getUnseenNotifications() {
  let currentUser = await getAuthUser();

  if (!currentUser) throw firstLogin;

  const { data, error } = await supabase.rpc("get_notifications_with_details", {
    only_unseen: true,
  });

  if (error) throw error;

  return { success: true, data: formatNotification(data) };
}
