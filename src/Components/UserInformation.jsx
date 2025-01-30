import { GetAuth } from "../Context/AuthContext";
import Avatar from "./Avatar";

let UserInformation = () => {
  let { user } = GetAuth();
  return (
    <section className="flex flex-col items-center">
      <Avatar url={user.avatarUrl} className="z-10" name={user.fullName} />
      <section className="-mt-4 flex w-full flex-col items-center bg-secondary-surface px-3 py-2 pt-6">
        <h2 className="text-xl text-text">{user.fullName}</h2>
      </section>
    </section>
  );
};

export default UserInformation;
