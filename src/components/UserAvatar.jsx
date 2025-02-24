let UserAvatar = ({ url, username }) => {
  return (
    <div className="m-2 size-32 shrink-0 overflow-hidden rounded-full shadow-xl outline outline-2 outline-offset-4 outline-primary/40">
      <img
        draggable={false}
        className="h-full w-full object-cover"
        src={url}
        alt={username}
      />
    </div>
  );
};

export default UserAvatar;
