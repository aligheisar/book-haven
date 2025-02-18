import CommentNotif from "./CommentNotif";
import FollowNotif from "./FollowNotif";
import LikeNotif from "./LikeNotif"

let NotificationRenderer = ({ closeNotifications, notifs }) => {
  return (
    notifs.map(i => {
      switch (i.type) {
        case "like":
          return <LikeNotif notif={i} closeNotifications={closeNotifications} />
        case "comment":
          return <CommentNotif notif={i} closeNotifications={closeNotifications} />
        case "follow":
          return <FollowNotif notif={i} closeNotifications={closeNotifications} />
        default:
          return null;
      }
    })
  )
}

export default NotificationRenderer;