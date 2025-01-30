import { GetUser } from "../Context/UserContext";
import DashbordAvatar from "./DashbordAvatar";
import EditableText from "./EditableText";

let UserInformation = () => {
  let { user, changeFullName } = GetUser();
  return (
    <section className="relative mt-4 flex w-full flex-col items-center rounded-md bg-secondary-surface px-3 py-2 pt-8">
      <DashbordAvatar className="absolute -top-1/2 left-1/2 -translate-x-1/2 translate-y-6" />
      <EditableText changeHandler={changeFullName} content={user.fullName} />
    </section>
  );
};
export default UserInformation;
