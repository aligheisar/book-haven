import CustomLink from "./CustomLink";

let FollowNotif = ({ closeNotifications, notif }) => {
  return (
    <div className="p-2 border-b border-secondary/30">
      <CustomLink closeFunc={closeNotifications} to={`/users/${notif.sender.username}`}>{notif.sender.fullName}</CustomLink> start to Following you
    </div>

  )
}

export default FollowNotif;