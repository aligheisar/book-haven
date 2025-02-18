import CustomLink from "./CustomLink"

let CommentNotif = ({ closeNotifications, notif }) => {
  return (
    <div className="p-2 border-b border-secondary/30">
      <CustomLink closeFunc={closeNotifications} to={`/users/${encodeURIComponent(notif.sender.username)}`} >{notif.sender.fullName}</CustomLink> add a Comment on your <CustomLink closeFunc={closeNotifications} to={`/users/${encodeURIComponent(notif.book.user.username)}/${encodeURIComponent(notif.book.title)}`}>{notif.book.title}</CustomLink> book
    </div>
  )
}

export default CommentNotif;