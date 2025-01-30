import { GetUser } from "../Context/UserContext";
import Avatar from "./Avatar";
import EditableText from "./EditableText";

let UserInformation = () => {
  let { user } = GetUser();
  return (
    <section className="relative mt-4 flex w-full flex-col items-center rounded-md bg-secondary-surface px-3 py-2 pt-8">
      <Avatar
        url={user.avatarUrl}
        name={user.fullName}
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 translate-y-6"
      />
      <EditableText
        changeHandler={async (data) =>
          new Promise((resolve, reject) =>
            setTimeout(() => resolve(data), 2000),
          )
        }
        content={user.fullName}
      />
    </section>
  );
};
export default UserInformation;
