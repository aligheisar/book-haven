import { GetAuth } from "../Context/AuthContext";
import Avatar from "./Avatar";
import EditableText from "./EditableText";

let UserInformation = () => {
  let { user } = GetAuth();
  return (
    <section className="flex flex-col items-center">
      <Avatar url={user.avatarUrl} name={user.fullName} className="z-[1]" />
      <section className="-mt-6 flex w-full flex-col items-center rounded-md bg-secondary-surface px-3 py-2 pt-8">
        <EditableText
          changeHandler={async (data) =>
            new Promise((resolve, reject) =>
              setTimeout(() => resolve(data), 2000),
            )
          }
          content={user.fullName}
        />
      </section>
    </section>
  );
};
export default UserInformation;
