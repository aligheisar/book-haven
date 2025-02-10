import { GetUser } from "../context/UserContext";
import { validateInputs } from "../util/validate";
import DashboardAvatar from "./DashboardAvatar";
import EditableText from "./EditableText";
import NonEditableText from "./NonEditableText";

let AccountInformation = () => {
  let { user, changeFullName } = GetUser();

  let fullNameValidator = (value) => {
    return validateInputs("fullName", value);
  };
  return (
    <section className="relative mt-4 flex w-full flex-col items-center rounded-md bg-secondary-surface px-3 py-2 pt-8">
      <DashboardAvatar className="absolute -top-14 left-1/2 -translate-x-1/2 translate-y-6" />
      <EditableText
        validator={fullNameValidator}
        changeHandler={changeFullName}
        title="Full Name"
        content={user.fullName}
      />
      <NonEditableText title="Email" content={user.email} />
      <NonEditableText title="Username" content={user.username} />
    </section>
  );
};
export default AccountInformation;
