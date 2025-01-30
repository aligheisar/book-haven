import { GetUser } from "../Context/UserContext";
import { validateInputs } from "../util/validate";
import DashbordAvatar from "./DashbordAvatar";
import EditableText from "./EditableText";

let UserInformation = () => {
  let { user, changeFullName } = GetUser();

  let fullNameValidator = (value) => {
    return validateInputs("fullName", value);
  };
  return (
    <section className="relative mt-4 flex w-full flex-col items-center rounded-md bg-secondary-surface px-3 py-2 pt-8">
      <DashbordAvatar className="absolute -top-12 left-1/2 -translate-x-1/2 translate-y-6" />
      <EditableText
        validator={fullNameValidator}
        changeHandler={changeFullName}
        content={user.fullName}
      />
    </section>
  );
};
export default UserInformation;
