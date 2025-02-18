import CustomLink from "./CustomLink";

let LikeNotif = ({ closeNotifications, notif }) => {
  return (
    <div className="p-2 border-b border-secondary/30">
      <CustomLink closeFunc={closeNotifications} to={`/users/${notif.sender.username}`}>{notif.sender.fullName}</CustomLink> like your <CustomLink closeFunc={closeNotifications} to={`/users/${encodeURIComponent(notif.book.user.username)}/${encodeURIComponent(notif.book.title)}`}>{notif.book.title}</CustomLink> book
    </div>
  )
}

export default LikeNotif;