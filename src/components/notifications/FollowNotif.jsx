import CustomLink from "../CustomLink";

let FollowNotif = ({ closeNotifications, notif }) => {
  return (
    <div className="border-b border-secondary/30 p-2">
      <CustomLink
        closeFunc={closeNotifications}
        to={`/users/${notif.sender.username}`}
      >
        {notif.sender.fullName}
      </CustomLink>{" "}
      start to Following you
    </div>
  );
};

export default FollowNotif;
