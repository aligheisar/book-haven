import CustomLink from "../CustomLink";

let LikeNotif = ({ closeNotifications, notif }) => {
  return (
    <div className="border-b border-secondary/30 p-2">
      <CustomLink
        closeFunc={closeNotifications}
        to={`/users/${notif.sender.username}`}
      >
        {notif.sender.fullName}
      </CustomLink>{" "}
      like your{" "}
      <CustomLink
        closeFunc={closeNotifications}
        to={`/users/${encodeURIComponent(notif.book.user.username)}/${encodeURIComponent(notif.book.title)}`}
      >
        {notif.book.title}
      </CustomLink>{" "}
      book
    </div>
  );
};

export default LikeNotif;
