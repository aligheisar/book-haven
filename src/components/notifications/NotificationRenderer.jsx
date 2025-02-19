import CommentNotif from "./CommentNotif";
import FollowNotif from "./FollowNotif";
import LikeNotif from "./LikeNotif";

let NotificationRenderer = ({ closeNotifications, notifs }) => {
  return notifs.map((i) => {
    switch (i.type) {
      case "like":
        return (
          <LikeNotif
            key={i.id}
            notif={i}
            closeNotifications={closeNotifications}
          />
        );
      case "comment":
        return (
          <CommentNotif
            key={i.id}
            notif={i}
            closeNotifications={closeNotifications}
          />
        );
      case "follow":
        return (
          <FollowNotif
            key={i.id}
            notif={i}
            closeNotifications={closeNotifications}
          />
        );
      default:
        return null;
    }
  });
};

export default NotificationRenderer;
